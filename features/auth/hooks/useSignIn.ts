import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import * as authService from '../services/authService';
import { useToast } from '@/providers/ToastProvider';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const { showToast } = useToast();
  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const accessToken = await authService.performGoogleSignIn();
      const { user, jwt } = await authService.authenticateWithStrapi(accessToken);
      login(user, jwt);
      showToast({ type: 'success', message: `Bem vindo(a), ${user.username}!` });
      if (user.isSetupComplete) {
        router.replace('/(app)');
      } else {
        router.replace('/initial-setup/step1');
      }
    } catch (error: any) {
      showToast({ type: 'error', message: error.error.message || "Um erro inesperado ocorreu." });
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleSignIn };
};