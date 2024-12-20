import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessTokenFromHash, saveAccessToken } from '../utils/auth';
import { getPendingChallenge, clearPendingChallenge } from '../utils/challenge';

export const Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getAccessTokenFromHash();
    if (token) {
      saveAccessToken(token);
      
      // First check state from location
      const pendingChallenge = getPendingChallenge();
      if (pendingChallenge) {
        clearPendingChallenge();
        navigate(`/challenge/${pendingChallenge}`, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
    </div>
  );
};