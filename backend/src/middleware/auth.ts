import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import type { AuthTokenPayload } from '../types';

declare module 'express-serve-static-core' {
  interface Request {
    auth?: AuthTokenPayload;
  }
}

/**
 * Verifies the JWT supplied via the `token` header (the convention the frontend
 * already uses) or a standard `Authorization: Bearer <token>` header.
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const headerToken = req.header('token');
  const bearer = req.header('authorization')?.replace(/^Bearer\s+/i, '');
  const token = headerToken ?? bearer;

  if (!token) {
    res.status(401).json({ message: 'Authentication token missing' });
    return;
  }

  try {
    req.auth = jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
