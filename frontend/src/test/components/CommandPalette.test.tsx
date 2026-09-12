import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CommandPalette } from '../../components/ui/CommandPalette';

describe('CommandPalette component', () => {
  it('renders search input and navigation shortcuts when open', () => {
    render(
      <BrowserRouter>
        <CommandPalette isOpen={true} onClose={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/type a command or search/i)).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Leads Pipeline')).toBeInTheDocument();
  });

  it('filters results dynamically when query is typed', () => {
    render(
      <BrowserRouter>
        <CommandPalette isOpen={true} onClose={() => {}} />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/type a command or search/i);
    fireEvent.change(input, { target: { value: 'Task Manager' } });
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
  });
});
