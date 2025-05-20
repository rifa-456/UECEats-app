import React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { config } from '@/constants/config';
import Toast from 'react-native-toast-message';
import {useUserStore} from "@/stores/useUserStore";
import {providerAuth} from "@/services/strapiService";
import {useCommonFetch} from "@/hooks/useCommonFetch";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleSignIn() {
    const { login } = useUserStore();
    const { refetchUser } = useCommonFetch();
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: config.googleIosClientId,
        androidClientId: config.googleAndroidClientId,
        webClientId: config.googleWebClientId,
        scopes: ['profile', 'email'],
    });
    React.useEffect(() => {
        const handleSignInResponse = async () => {
            if (response?.type === 'success') {
                const { authentication } = response;
                if (authentication?.accessToken) {
                    try {
                        Toast.show({ type: 'info', text1: 'Authenticating with server...' });
                        const {user, jwt} = await providerAuth.authenticateProvider('google', authentication.accessToken);
                        login(user, jwt);
                        await refetchUser();
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