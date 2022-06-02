import { useEffect } from 'react';

/**
 * Determine whether the current environment is development or production.
 * @returns boolean: `true` if development, `false` if production
 */
export const isDevelopment = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

/**
 * Hook to prevent the browser from registering default gesture events.
 */
export const usePreventGestureDefault = () => {
  useEffect(() => {
    const handler = (e) => e.preventDefault();
    document.addEventListener('gesturestart', handler);
    document.addEventListener('gesturechange', handler);
    document.addEventListener('gestureend', handler);
    return () => {
      document.removeEventListener('gesturestart', handler);
      document.removeEventListener('gesturechange', handler);
      document.removeEventListener('gestureend', handler);
    };
  }, []);
};

/**
 * Escape special characters used by RegExp, in order to safely
 * use regex against the supplied string.
 * @param string The string to escape for RegExp.
 * @returns The escaped string.
 */
export const escapeForRegExp = (string: string) =>
  string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
