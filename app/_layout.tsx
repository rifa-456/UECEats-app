import React, { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding.
SplashScreen.preventAutoHideAsync();

function RootNavigation() {
    const { isLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);

    if (isLoading) {
        return null; // Or a custom loading screen if you prefer over splash
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                // If authenticated, show the (tabs) group.
                // The actual tab navigator is defined in (tabs)/_layout.tsx
                <Stack.Screen name="(tabs)" />
            ) : (
                // If not authenticated, show the login screen.
                <Stack.Screen name="index" />
            )}
            {/* This ensures that +not-found.tsx can be reached from anywhere */}
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <RootNavigation />
                <Toast />
            </AuthProvider>
        </GestureHandlerRootView>
    );
}