import { useEffect } from 'react';

export interface ShortcutOptions {
  ctrl?: boolean;
  meta?: boolean;
  alt?: boolean;
  shift?: boolean;
  preventDefault?: boolean;
}

/**
 * Hook to bind custom global or local keyboard shortcut handlers.
 */
export function useKeyboardShortcut(
  key: string,
  callback: (e: KeyboardEvent) => void,
  options: ShortcutOptions = {}
): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const matchKey = e.key.toLowerCase() === key.toLowerCase();
      const matchCtrl = options.ctrl ? e.ctrlKey : true;
      const matchMeta = options.meta ? e.metaKey : true;
      const matchAlt = options.alt ? e.altKey : true;
      const matchShift = options.shift ? e.shiftKey : true;

      if (matchKey && matchCtrl && matchMeta && matchAlt && matchShift) {
        if (options.preventDefault) {
          e.preventDefault();
        }
        callback(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback, options]);
}
