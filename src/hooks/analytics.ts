import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageViews = () => {
  const location = useLocation();
  useEffect(() => {
    window.analytics.page(location.pathname);
  }, [location]);
};
