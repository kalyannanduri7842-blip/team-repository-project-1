import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AnalyticsPage } from '../../pages/reports/AnalyticsPage';

describe('AnalyticsPage', () => {
  it('renders pipeline intelligence page with velocity and cohort metrics', () => {
    render(
      <BrowserRouter>
        <AnalyticsPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/advanced analytics & pipeline intelligence/i)).toBeInTheDocument();
    expect(screen.getByText('$74.2k/day')).toBeInTheDocument();
    expect(screen.getByText(/avg sales cycle/i)).toBeInTheDocument();
    expect(screen.getAllByText(/net revenue retention/i)[0]).toBeInTheDocument();
  });
});
