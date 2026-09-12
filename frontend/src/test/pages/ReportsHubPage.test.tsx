import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReportsHubPage } from '../../pages/reports/ReportsHubPage';

describe('ReportsHubPage', () => {
  it('renders reports hub title, metrics, and export buttons', () => {
    render(
      <BrowserRouter>
        <ReportsHubPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/executive reports & intelligence/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /export csv/i })).toBeInTheDocument();
  });
});
