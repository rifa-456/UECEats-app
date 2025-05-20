import strapiClient from '@/lib/strapiClient';

interface StrapiAuthResponse {
    jwt: string;
    user: any;
}

export async function authenticateWithStrapi(
    googleAccessToken: string
): Promise<StrapiAuthResponse> {
    try {
        const response = await strapiClient.get<StrapiAuthResponse>(
            `/api/auth/google/callback?access_token=${googleAccessToken}`
        );
        return response.data;
    } catch (error: any) {
        console.error('Strapi Authentication Error:', error.response?.data || error.message);
        throw new Error(
            error.response?.data?.error?.message || 'Failed to authenticate with server.'
        );
    }
}