import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '../../components/ui/Tabs';

describe('Tabs component', () => {
  const tabItems = [
    { id: 'all', label: 'All Activities', count: 45 },
    { id: 'calls', label: 'Calls', count: 12 },
    { id: 'meetings', label: 'Meetings', count: 8 },
  ];

  it('renders tab labels with badges', () => {
    render(<Tabs tabs={tabItems} activeTab="all" onChange={() => {}} />);
    expect(screen.getByText(/all activities/i)).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText(/calls/i)).toBeInTheDocument();
  });

  it('calls onChange callback when another tab is clicked', () => {
    const handleChange = vi.fn();
    render(<Tabs tabs={tabItems} activeTab="all" onChange={handleChange} />);
    fireEvent.click(screen.getByText(/calls/i));
    expect(handleChange).toHaveBeenCalledWith('calls');
  });
});
