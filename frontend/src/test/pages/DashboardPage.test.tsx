import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';

describe('DashboardPage', () => {
  it('renders executive KPI cards and dashboard sections', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/total leads/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/total customers/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/total deals/i).length).toBeGreaterThan(0);
  });
});
