import {
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
    GOOGLE_WEB_CLIENT_ID,
    STRAPI_BASE_URL,
    STRAPI_BASE_URL_ANDROID_EMULATOR
} from "@env";
import { Platform } from 'react-native';

const selectedStrapiBaseUrl = Platform.OS === 'android' && !__DEV__
    ? STRAPI_BASE_URL_ANDROID_EMULATOR
    : STRAPI_BASE_URL;

export const config = {
    strapiBaseUrl: selectedStrapiBaseUrl,
    googleIosClientId: GOOGLE_IOS_CLIENT_ID,
    googleAndroidClientId: GOOGLE_ANDROID_CLIENT_ID,
    googleWebClientId: GOOGLE_WEB_CLIENT_ID,
    endpoints: {
        strapiAuthGoogleCallback: '/api/auth/google/callback',
        usersMe: '/api/users/me',
    }
};