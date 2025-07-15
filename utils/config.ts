import { Platform } from "react-native"; 

const selectedStrapiBaseUrl =
    __DEV__ && Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_STRAPI_BASE_URL_ANDROID_EMULATOR
      : process.env.EXPO_PUBLIC_STRAPI_BASE_URL;

export const config = {
  strapiBaseUrl: selectedStrapiBaseUrl,
  googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  googleAndroidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
};