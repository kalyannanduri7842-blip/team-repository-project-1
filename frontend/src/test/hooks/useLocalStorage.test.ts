import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { storage } from '../../utils/storage';

describe('useLocalStorage hook', () => {
  it('reads initial value and writes updates to storage', () => {
    const { result } = renderHook(() => useLocalStorage('test_hook_key', 'initial'));

    expect(result.current[0]).toBe('initial');

    act(() => {
      result.current[1]('updated_val');
    });

    expect(result.current[0]).toBe('updated_val');
    expect(storage.getItem('test_hook_key', '')).toBe('updated_val');
  });
});
