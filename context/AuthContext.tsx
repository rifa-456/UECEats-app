import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authStorage from '@/lib/authStorage';
import { router } from 'expo-router'; // Import router

interface AuthContextType {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: any, token: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start as true
    useEffect(() => {
        const loadAuthData = async () => {
            setIsLoading(true);
            const storedToken = await authStorage.getStoredToken();
            const storedUser = await authStorage.getStoredUser();
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(storedUser);
            }
            setIsLoading(false);
        };
        loadAuthData();
    }, []);

    const login = async (userData: any, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        await authStorage.storeToken(authToken);
        await authStorage.storeUser(userData);
        router.replace('/(tabs)/welcome');
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await authStorage.clearStoredAuth();
        router.replace('/');
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated: !!token, isLoading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};