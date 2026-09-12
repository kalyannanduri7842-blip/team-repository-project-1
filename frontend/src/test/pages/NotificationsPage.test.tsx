import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsPage } from '../../pages/notifications/NotificationsPage';

describe('NotificationsPage', () => {
  it('renders notifications center header and filter buttons', () => {
    render(
      <BrowserRouter>
        <NotificationsPage />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /notification center/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^all notifications$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mark all as read/i })).toBeInTheDocument();
  });
});
