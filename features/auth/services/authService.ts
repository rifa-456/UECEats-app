import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { strapiSdk } from '@/api/strapi-client';
import { config } from '@/utils/config';

GoogleSignin.configure({
  webClientId: config.googleWebClientId,
  offlineAccess: true,
});

/**
 * Handles the Google Sign-In process and returns the ID token.
 * @returns {Promise<string>} The Google ID token.
 */
export const performGoogleSignIn = async (): Promise<string> => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signIn();
    const tokensResponse = await GoogleSignin.getTokens();
    const accessToken = tokensResponse.accessToken;
    if (!accessToken) {
      throw new Error("Login pelo Google falhou, nenhum token de acesso foi pego.");
    }
    return accessToken;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error("Usuário cancelou o login.");
    }
    throw error;
  }
};

/**
 * Authenticates the user with Strapi using a provider token.
 * @param {string} accessToken - The ID token from the authentication provider.
 * @returns {Promise<{user: any, jwt: string}>} The user object and JWT from Strapi.
 */
export const authenticateWithStrapi = async (accessToken: string) => {
  try {
    const { user, jwt } = await strapiSdk.authenticateProvider('google', accessToken);
    if (!user || !jwt) {
      throw new Error("Strapi authentication failed: No user or JWT returned.");
    }
    return { user, jwt };
  } catch (error) {
    throw error;
  }
};