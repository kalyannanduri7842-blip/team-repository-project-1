import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StatCard } from '../../components/ui/StatCard';
import { Users } from 'lucide-react';

describe('StatCard component', () => {
  it('renders title, value, and change indicators', () => {
    render(
      <StatCard
        title="Total Active Leads"
        value="1,450"
        change={12.5}
        changePeriod="vs last month"
        icon={<Users data-testid="users-icon" />}
      />
    );

    expect(screen.getByText(/total active leads/i)).toBeInTheDocument();
    expect(screen.getByText('1,450')).toBeInTheDocument();
    expect(screen.getByText(/12.5%/i)).toBeInTheDocument();
    expect(screen.getByText(/vs last month/i)).toBeInTheDocument();
    expect(screen.getByTestId('users-icon')).toBeInTheDocument();
  });

  it('handles card click when onClick is provided', () => {
    const handleClick = vi.fn();
    render(
      <StatCard
        title="Clickable Stat"
        value="250"
        icon={<Users />}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText(/clickable stat/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
