import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable, ColumnDef } from '../../components/ui/DataTable';

interface TestItem {
  id: string;
  name: string;
  role: string;
  score: number;
}

describe('DataTable component', () => {
  const data: TestItem[] = [
    { id: '1', name: 'Alice Smith', role: 'Engineer', score: 95 },
    { id: '2', name: 'Bob Jones', role: 'Designer', score: 82 },
  ];

  const columns: ColumnDef<TestItem>[] = [
    { id: 'name', header: 'Full Name', accessorKey: 'name', sortable: true },
    { id: 'role', header: 'Position', accessorKey: 'role' },
    { id: 'score', header: 'Score', render: (row) => `${row.score}/100` },
  ];

  it('renders table headers and row cells properly', () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('95/100')).toBeInTheDocument();
    expect(screen.getByText('Bob Jones')).toBeInTheDocument();
  });

  it('handles row click when onRowClick is passed', () => {
    const handleRowClick = vi.fn();
    render(<DataTable data={data} columns={columns} onRowClick={handleRowClick} />);
    fireEvent.click(screen.getByText('Alice Smith'));
    expect(handleRowClick).toHaveBeenCalledWith(data[0]);
  });
});
