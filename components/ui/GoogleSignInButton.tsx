import React from 'react';
import { Button, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';

export function GoogleSignInButton() {
    const { isGoogleSignInLoading, promptGoogleSignIn } = useGoogleSignIn();

    if (isGoogleSignInLoading) { // This reflects the hook readiness, not active sign-in
        // You might want a more nuanced loading state if promptAsync is in progress
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.buttonContainer}>
            <Button title="Sign in with Google" onPress={promptGoogleSignIn} />
        </View>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 20,
    }
})