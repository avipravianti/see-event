import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SignUp from './SignUp';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SignUp', () => {
  it('renders the "Join us!" heading', () => {
    renderWithProviders(<SignUp />);
    expect(screen.getByText(/join/i)).toBeInTheDocument();
  });
});
