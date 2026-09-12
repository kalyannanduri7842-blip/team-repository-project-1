import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '../../components/ui/Avatar';

describe('Avatar component', () => {
  it('renders initials when no image source is provided', () => {
    render(<Avatar name="Sarah Jenkins" />);
    expect(screen.getByText('SJ')).toBeInTheDocument();
  });

  it('renders image element when src is provided', () => {
    render(<Avatar name="Alex Morgan" src="https://example.com/avatar.jpg" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(img).toHaveAttribute('alt', 'Alex Morgan');
  });

  it('renders status dot indicator when status prop is passed', () => {
    const { container } = render(<Avatar name="Marcus Sterling" status="online" />);
    const statusDot = container.querySelector('.bg-emerald-500');
    expect(statusDot).toBeInTheDocument();
  });
});
