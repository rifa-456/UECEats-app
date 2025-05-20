import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GoogleSignInButton } from '@/components/ui/GoogleSignInButton';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router'; // Keep for potential pre-auth checks

export default function LoginScreen() {
    const { isAuthenticated, isLoading } = useAuth(); // isLoading from AuthContext

    // While AuthContext is loading initial state, don't render anything or show a spinner
    if (isLoading) {
        return null;
    }

    // If already authenticated (e.g. token found from previous session), redirect to tabs
    // This redirect is now effectively handled by the RootNavigation in _layout.tsx
    // but having it here can be a fallback or explicit if needed.
    if (isAuthenticated) {
        return <Redirect href="/(tabs)/welcome" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to UECEats</Text>
            <Text style={styles.subtitle}>Please sign in to continue</Text>
            <GoogleSignInButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
});