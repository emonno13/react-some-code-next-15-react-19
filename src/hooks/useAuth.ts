'use client';

import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('isAuthenticated', isAuthenticated);
  useEffect(() => {
    // Check if accessToken cookie exists
    const cookies = document.cookie.split(';');
    const hasAccessToken = cookies.some((cookie) =>
      cookie.trim().startsWith('accessToken=')
    );
    setIsAuthenticated(hasAccessToken);
  }, []);

  return { isAuthenticated };
}
