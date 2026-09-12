import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

describe('ConfirmDialog component', () => {
  it('renders confirmation title, message, and action buttons', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Delete Lead Record?"
        message="Are you sure you want to permanently delete this lead?"
        onConfirm={() => {}}
        onClose={() => {}}
      />
    );

    expect(screen.getByText(/delete lead record\?/i)).toBeInTheDocument();
    expect(screen.getByText(/permanently delete this lead\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('triggers onConfirm when confirm button is clicked', () => {
    const handleConfirm = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirm Action"
        message="Proceed?"
        onConfirm={handleConfirm}
        onClose={() => {}}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(handleConfirm).toHaveBeenCalled();
  });
});
