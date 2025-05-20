import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

const webStorage = {
    async setItemAsync(key: string, value: string): Promise<void> {
        localStorage.setItem(key, value);
    },
    async getItemAsync(key: string): Promise<string | null> {
        return localStorage.getItem(key);
    },
    async deleteItemAsync(key: string): Promise<void> {
        localStorage.removeItem(key);
    }
};

const storage = Platform.OS === 'web' ? webStorage : SecureStore;

export async function storeToken(token: string): Promise<void> {
    await storage.setItemAsync(TOKEN_KEY, token);
}

export async function getStoredToken(): Promise<string | null> {
    return await storage.getItemAsync(TOKEN_KEY);
}

export async function storeUser(user: any): Promise<void> {
    await storage.setItemAsync(USER_KEY, JSON.stringify(user));
}

export async function getStoredUser(): Promise<any | null> {
    const userStr = await storage.getItemAsync(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
}

export async function clearStoredAuth(): Promise<void> {
    await storage.deleteItemAsync(TOKEN_KEY);
    await storage.deleteItemAsync(USER_KEY);
}