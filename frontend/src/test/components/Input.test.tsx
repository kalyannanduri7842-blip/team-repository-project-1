import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../components/ui/Input';

describe('Input component', () => {
  it('renders input with label and placeholder', () => {
    render(<Input label="Company Name" placeholder="e.g. Acme Corp" />);
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. acme corp/i)).toBeInTheDocument();
  });

  it('handles text changes correctly', () => {
    const handleChange = vi.fn();
    render(<Input label="Email Address" onChange={handleChange} />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: 'test@nexora.io' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders error message when error prop is passed', () => {
    render(<Input label="Password" error="Password must be at least 8 characters" />);
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });
});
