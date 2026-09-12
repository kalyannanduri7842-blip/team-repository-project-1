import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToastContainer } from '../../components/ui/ToastContainer';
import { useNotificationStore } from '../../store/useNotificationStore';

describe('ToastContainer component', () => {
  it('renders active toasts from notification store', () => {
    useNotificationStore.setState({
      toasts: [
        { id: 't1', title: 'Deal Saved', message: 'The deal was saved to local storage.', type: 'success' },
      ],
    });

    render(<ToastContainer />);
    expect(screen.getByText(/deal saved/i)).toBeInTheDocument();
    expect(screen.getByText(/the deal was saved to local storage/i)).toBeInTheDocument();
  });
});
