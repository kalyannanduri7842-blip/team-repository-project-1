import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

/**
 * Hook to synchronize state with LocalStorage.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.getItem<T>(key, initialValue);
  });

  const setValue = (val: T | ((prev: T) => T)) => {
    const valueToStore = val instanceof Function ? val(storedValue) : val;
    setStoredValue(valueToStore);
    storage.setItem(key, valueToStore);
  };

  return [storedValue, setValue];
}
