import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SettingsPage } from '../../pages/settings/SettingsPage';

describe('Settings Flow Integration', () => {
  it('renders settings tabs and organization controls', () => {
    render(
      <BrowserRouter>
        <SettingsPage />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /system & account settings/i })).toBeInTheDocument();
    expect(screen.getByText(/user profile/i)).toBeInTheDocument();
    expect(screen.getByText(/data management & backup/i)).toBeInTheDocument();
  });
});
