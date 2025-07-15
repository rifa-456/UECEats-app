import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

/**
 * A hook to access authentication state and status.
 * It intelligently handles the initial session loading (rehydration) state.
 */
export const useAuth = () => {
  const { user, jwt, isAuthenticated, isSetupComplete, logout } = useAuthStore(state => ({
    user: state.user,
    jwt: state.jwt,
    isAuthenticated: state.isAuthenticated(),
    isSetupComplete: state.isSetupComplete,
    logout: state.logout,
  }));
  const [isHydrated, setIsHydrated] = useState(useAuthStore.persist.hasHydrated);
  useEffect(() => {
    const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    return () => {
      unsubFinishHydration();
    };
  }, []);
  const isLoadingSession = !isHydrated;
  return {
    user,
    jwt,
    isAuthenticated,
    isSetupComplete,
    logout,
    isLoadingSession,
  };
};