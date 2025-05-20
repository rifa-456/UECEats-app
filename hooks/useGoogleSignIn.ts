import React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { appConfig } from '@/constants/appConfig';
import { authenticateWithStrapi } from '@/services/strapiAuthService';
import { useAuth } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleSignIn() {
    const { login } = useAuth();
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: appConfig.googleIosClientId,
        androidClientId: appConfig.googleAndroidClientId,
        webClientId: appConfig.googleWebClientId,
        scopes: ['profile', 'email'],
    });
    React.useEffect(() => {
        const handleSignInResponse = async () => {
            if (response?.type === 'success') {
                const { authentication } = response;
                if (authentication?.accessToken) {
                    try {
                        Toast.show({ type: 'info', text1: 'Authenticating with server...' });
                        const { jwt, user: strapiUser } = await authenticateWithStrapi(
                            authentication.accessToken
                        );
                        await login(strapiUser, jwt);
                        Toast.show({ type: 'success', text1: 'Login Successful!' });
                    } catch (error: any) {
                        Toast.show({ type: 'error', text1: 'Login Failed', text2: error.message });
                    }
                } else {
                    Toast.show({ type: 'error', text1: 'Google Login Error', text2: 'No access token received.' });
                }
            } else if (response?.type === 'error') {
                Toast.show({ type: 'error', text1: 'Google Login Failed', text2: response.error?.message });
            } else if (response?.type === 'cancel') {
                Toast.show({ type: 'info', text1: 'Login Cancelled' });
            }
        };
        if (response) {
            handleSignInResponse();
        }
    }, [response, login]);

    return {
        isGoogleSignInLoading: !request,
        promptGoogleSignIn: () => {
            if (request) {
                promptAsync();
            } else {
                Toast.show({ type: 'error', text1: 'Error', text2: 'Google Sign-In not ready.'})
            }
        },
    };
}