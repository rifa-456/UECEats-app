import React, { lazy, Suspense, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useUserStore } from '@/stores/useUserStore';
import { toastConfig } from '@/utils/toastConfig';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30000,
            refetchOnWindowFocus: true,
            retry: 1,
        },
    },
});
const DevtoolsWrapper = lazy(() =>
    Promise.resolve({
        default: ({ children }: { children: React.ReactNode }) => (
            <>
                {children}
                {__DEV__ && <ReactQueryDevtools buttonPosition="bottom-left" />}
            </>
        ),
    })
);

function RootNavigation() {
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated = useUserStore(state => state.isAuthenticated());
    useEffect(() => {
        const initialize = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 100));
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to initialize:', error);
                setIsLoading(false);
            }
        };
        initialize();
    }, []);
    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);
    if (isLoading) {
        return null;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Stack.Screen name="(tabs)" />
                ) : (
                    <Stack.Screen name="index" />
                )}
                <Stack.Screen name="+not-found" />
            </Stack>
        </QueryClientProvider>
    );
}

export default function RootLayout() {
    const [showDevtools, setShowDevtools] = useState(false);
    useEffect(() => {
        if (__DEV__) {
            // @ts-ignore
            global.toggleDevtools = () => setShowDevtools(prev => !prev);
        }
    }, []);
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }
    return (
        <GestureHandlerRootView style={styles.container}>
            <Suspense fallback={null}>
                <DevtoolsWrapper>
                    <RootNavigation />
                </DevtoolsWrapper>
            </Suspense>
            <Toast config={toastConfig} />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});