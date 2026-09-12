import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from '../../components/ui/EmptyState';
import { Plus } from 'lucide-react';

describe('EmptyState component', () => {
  it('renders title, description, and action button', () => {
    const handleAction = vi.fn();
    render(
      <EmptyState
        title="No Leads Found"
        description="Try adjusting your search filters or create a new lead."
        actionLabel="Create Lead"
        onAction={handleAction}
        icon={<Plus />}
      />
    );

    expect(screen.getByText(/no leads found/i)).toBeInTheDocument();
    expect(screen.getByText(/try adjusting your search/i)).toBeInTheDocument();
    
    const actionBtn = screen.getByRole('button', { name: /create lead/i });
    expect(actionBtn).toBeInTheDocument();
    fireEvent.click(actionBtn);
    expect(handleAction).toHaveBeenCalled();
  });
});
