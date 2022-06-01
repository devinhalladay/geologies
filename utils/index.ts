import { useEffect } from 'react';

export const isDevelopment = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

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
