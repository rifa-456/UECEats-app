import { Stack, Redirect } from 'expo-router';
import { useAuthStore } from '@/features/auth/store/authStore';
import { InitialSetupProvider } from '@/features/initial-setup/providers/InitialSetupProvider';

export default function InitialSetupLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated()) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <InitialSetupProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="step1" />
        <Stack.Screen name="step2" />
        <Stack.Screen name="step3" />
        <Stack.Screen name="step4" />
      </Stack>
    </InitialSetupProvider>
  );
} 