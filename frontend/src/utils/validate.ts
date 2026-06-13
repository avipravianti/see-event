import type { SignUpPayload } from '@/types';

export type SignUpErrors = Partial<Record<keyof SignUpPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate the sign-up form. Returns a map of field -> error message;
 * an empty object means the form is valid.
 */
export function validateSignUp(values: SignUpPayload): SignUpErrors {
  const errors: SignUpErrors = {};

  if (values.firstName.trim().length < 3) {
    errors.firstName = 'This field is required';
  }
  if (values.lastName.trim().length < 3) {
    errors.lastName = 'This field is required';
  }
  if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Confirmation password is not the same as the password';
  }

  return errors;
}
