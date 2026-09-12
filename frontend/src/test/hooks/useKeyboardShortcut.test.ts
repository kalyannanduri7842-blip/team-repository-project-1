import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

describe('useKeyboardShortcut hook', () => {
  it('triggers callback on matching key press', () => {
    const callback = vi.fn();
    renderHook(() => useKeyboardShortcut('k', callback, { ctrl: true }));

    // Non matching event (no ctrl)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: false }));
    expect(callback).not.toHaveBeenCalled();

    // Matching event (with ctrl)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
