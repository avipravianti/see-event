import { describe, it, expect } from 'vitest';
import { validateSignUp } from './validate';

describe('validateSignUp', () => {
  it('returns no errors for a valid payload', () => {
    const errors = validateSignUp({
      firstName: 'Pratur',
      lastName: 'Anahata',
      email: 'pratur@example.com',
      password: 'secret123',
      confirmPassword: 'secret123',
    });
    expect(errors).toEqual({});
  });

  it('flags an invalid email and mismatched password', () => {
    const errors = validateSignUp({
      firstName: 'Pratur',
      lastName: 'Anahata',
      email: 'not-an-email',
      password: 'secret123',
      confirmPassword: 'different',
    });
    expect(errors.email).toBeDefined();
    expect(errors.confirmPassword).toBeDefined();
  });

  it('requires names of at least 3 characters', () => {
    const errors = validateSignUp({
      firstName: 'Ab',
      lastName: 'X',
      email: 'pratur@example.com',
      password: 'secret123',
      confirmPassword: 'secret123',
    });
    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeDefined();
  });
});
