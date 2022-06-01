import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const usePageViews = () => {
  const router = useRouter();
  useEffect(() => {
    window.analytics.page(router.pathname);
  }, []);
};
