import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../../components/ui/Dropdown';
import { Button } from '../../components/ui/Button';

describe('Dropdown component', () => {
  const items = [
    { id: 'item-1', label: 'Edit Lead', onClick: vi.fn() },
    { id: 'item-2', label: 'Export Data', onClick: vi.fn() },
    { id: 'item-3', label: 'Delete Record', onClick: vi.fn(), danger: true },
  ];

  it('renders trigger element and toggles menu items on click', () => {
    render(
      <Dropdown trigger={<Button>Actions</Button>} items={items} />
    );

    expect(screen.getByRole('button', { name: /actions/i })).toBeInTheDocument();
    
    // Open dropdown
    fireEvent.click(screen.getByRole('button', { name: /actions/i }));
    expect(screen.getByText('Edit Lead')).toBeInTheDocument();
    expect(screen.getByText('Export Data')).toBeInTheDocument();
    expect(screen.getByText('Delete Record')).toBeInTheDocument();

    // Click item
    fireEvent.click(screen.getByText('Edit Lead'));
    expect(items[0].onClick).toHaveBeenCalled();
  });
});
