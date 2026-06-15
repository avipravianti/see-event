import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { allocateUserId, users } from '../data/store';
import { authenticate } from '../middleware/auth';
import type { UserRecord } from '../types';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toUserDetail(user: UserRecord) {
  const { password: _password, ...rest } = user;
  return rest;
}

// POST /users/signup
router.post('/signup', (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body ?? {};

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ message: 'Email is invalid' });
    return;
  }
  if (String(password).length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters' });
    return;
  }
  if (password !== confirmPassword) {
    res.status(400).json({ message: 'Passwords do not match' });
    return;
  }
  if (users.some((u) => u.email === email)) {
    res.status(409).json({ message: 'Email already registered' });
    return;
  }

  const user: UserRecord = { id: allocateUserId(), firstName, lastName, email, password };
  users.push(user);
  res.status(201).json({ message: 'User registered successfully', data: toUserDetail(user) });
});

// POST /users/signin
router.post('/signin', (req, res) => {
  const { email, password } = req.body ?? {};
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    res.status(401).json({ message: 'Invalid email and password combination' });
    return;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, { expiresIn: '7d' });
  res.json({ token, data: toUserDetail(user) });
});

// GET /users — current authenticated user.
router.get('/', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.auth?.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json({ data: toUserDetail(user) });
});

// PUT /users — edit the current user's profile.
router.put('/', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.auth?.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const { firstName, lastName, email, image } = req.body ?? {};

  if (firstName !== undefined) {
    if (String(firstName).trim().length === 0) {
      res.status(400).json({ message: 'First name cannot be empty' });
      return;
    }
    user.firstName = String(firstName);
  }
  if (lastName !== undefined) user.lastName = String(lastName);
  if (email !== undefined) {
    if (!EMAIL_RE.test(email)) {
      res.status(400).json({ message: 'Email is invalid' });
      return;
    }
    if (users.some((u) => u.email === email && u.id !== user.id)) {
      res.status(409).json({ message: 'Email already registered' });
      return;
    }
    user.email = String(email);
  }
  if (image !== undefined) user.image = image ? String(image) : undefined;

  res.json({ message: 'Profile updated successfully', data: toUserDetail(user) });
});

// PUT /users/password — change the current user's password.
router.put('/password', authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.auth?.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const { oldPassword, newPassword } = req.body ?? {};

  if (user.password !== oldPassword) {
    res.status(400).json({ message: 'Old password is incorrect' });
    return;
  }
  if (String(newPassword ?? '').length < 6) {
    res.status(400).json({ message: 'New password must be at least 6 characters' });
    return;
  }

  user.password = String(newPassword);
  res.json({ message: 'Password changed successfully' });
});

export default router;
