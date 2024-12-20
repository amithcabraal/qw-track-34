import { useState, useEffect } from 'react';
import { getStoredAccessToken } from '../utils/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(getStoredAccessToken());
  });

  useEffect(() => {
    // Check token on mount and when storage changes
    const checkAuth = () => {
      const token = getStoredAccessToken();
      setIsAuthenticated(Boolean(token));
    };

    // Listen for storage changes (in case token is removed in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return { isAuthenticated };
};