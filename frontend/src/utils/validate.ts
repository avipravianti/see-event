import type { EventInput, ProfileInput, SignUpPayload } from '@/types';

export type SignUpErrors = Partial<Record<keyof SignUpPayload, string>>;
export type EventErrors = Partial<Record<keyof EventInput, string>>;
export type ProfileErrors = Partial<Record<keyof ProfileInput, string>>;
export interface PasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

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

/**
 * Validate the create/edit event form. Returns a map of field -> error message;
 * an empty object means the form is valid.
 */
export function validateEvent(values: EventInput): EventErrors {
  const errors: EventErrors = {};

  if (values.title.trim().length < 3) {
    errors.title = 'Title is required';
  }
  if (values.dateValue.trim().length === 0) {
    errors.dateValue = 'Date and time is required';
  }
  if (values.category.trim().length === 0) {
    errors.category = 'Please select a category';
  }
  if (values.detail.trim().length === 0) {
    errors.detail = 'Event details are required';
  }

  return errors;
}

/** Validate the edit-profile form. */
export function validateProfile(values: ProfileInput): ProfileErrors {
  const errors: ProfileErrors = {};

  if (values.firstName.trim().length === 0) {
    errors.firstName = 'This field is required';
  }
  if (values.lastName.trim().length === 0) {
    errors.lastName = 'This field is required';
  }
  if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  return errors;
}

/** Validate the change-password form. `confirmPassword` is the re-typed new password. */
export function validatePassword(values: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}): PasswordErrors {
  const errors: PasswordErrors = {};

  if (values.oldPassword.length === 0) {
    errors.oldPassword = 'Please enter your current password';
  }
  if (values.newPassword.length < 6) {
    errors.newPassword = 'Password must be at least 6 characters';
  }
  if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}
