import React from 'react';
import { ScrollView, Button, StyleSheet, View } from 'react-native';
import { WelcomeContent } from '@/components/WelcomeContent';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

export default function WelcomeScreen() {
    const { user, logout, isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return null;
    }
    if (!isAuthenticated || !user) {
        return <Redirect href="/" />;
    }
    const username = user.username || 'User';
    const email = user.email || 'No email provided';
    const avatarUrl = user.avatar?.formats?.thumbnail?.url || user.avatar?.url;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <WelcomeContent user={username} email={email} />
            <View style={styles.logoutButtonContainer}>
                <Button title="Logout" onPress={logout} color="#ff3b30" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    logoutButtonContainer: {
        marginTop: 30,
        width: '80%',
        maxWidth: 300,
    },
});