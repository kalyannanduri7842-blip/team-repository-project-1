import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

describe('useMediaQuery hook', () => {
  it('evaluates media query string gracefully without crashing', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(typeof result.current).toBe('boolean');
  });
});
