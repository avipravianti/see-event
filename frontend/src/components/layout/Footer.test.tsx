import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Footer', () => {
  it('renders the See Event brand text', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/see event/i)).toBeInTheDocument();
  });
});
