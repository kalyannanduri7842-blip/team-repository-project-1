import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../../components/ui/Select';

describe('Select component', () => {
  const sampleOptions = [
    { value: 'new', label: 'New Lead' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'lost', label: 'Lost' },
  ];

  it('renders select with label and provided options', () => {
    render(<Select label="Lead Status" options={sampleOptions} />);
    expect(screen.getByLabelText(/lead status/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /new lead/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /qualified/i })).toBeInTheDocument();
  });

  it('triggers onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(<Select label="Status" options={sampleOptions} onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'qualified' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
