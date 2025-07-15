import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
// eslint-disable-next-line camelcase
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { ToastProvider } from '@/providers/ToastProvider';

export default function RootLayout() {
  const [loaded] = useFonts({
    // eslint-disable-next-line camelcase
    "Inter-Regular": Inter_400Regular,
    // eslint-disable-next-line camelcase
    "Inter-Bold": Inter_700Bold,
  });
  if (!loaded) { 
    return null;
  }
  return (
    <GluestackUIProvider mode="light">
      <ToastProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(app)" />
            <Stack.Screen name="(auth)" />
          </Stack>
        </ThemeProvider>
      </ToastProvider>
    </GluestackUIProvider>
  );
} 