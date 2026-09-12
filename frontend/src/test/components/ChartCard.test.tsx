import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChartCard } from '../../components/ui/ChartCard';
import { Button } from '../../components/ui/Button';

describe('ChartCard component', () => {
  it('renders title, subtitle, action buttons, and chart container', () => {
    render(
      <ChartCard
        title="Revenue Trends"
        subtitle="Quarterly recurring ARR"
        action={<Button size="xs">Export</Button>}
      >
        <div data-testid="chart-dummy">Chart Content</div>
      </ChartCard>
    );

    expect(screen.getByText('Revenue Trends')).toBeInTheDocument();
    expect(screen.getByText('Quarterly recurring ARR')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
    expect(screen.getByTestId('chart-dummy')).toBeInTheDocument();
  });
});
