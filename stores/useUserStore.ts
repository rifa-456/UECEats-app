import type { UserType } from '@/types/strapiTypes';
import { create } from 'zustand';
import { AuthState } from "@/types/stateTypes";
import {
    getStoredUser,
    getStoredToken,
    storeUser,
    storeToken,
    clearStoredAuth
} from '@/utils/authStorage';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState = {
    user: null as UserType | null,
    jwt: null as string | null,
};

export const useUserStore = create<AuthState>()(
    persist(
        (set, get) => ({
            ...initialState,
            setUser: async (user: UserType) => {
                await storeUser(user);
                set({ user });
            },
            setAuthToken: async (jwt: string) => {
                await storeToken(jwt);
                set({ jwt });
            },
            login: async (user: UserType, jwt: string) => {
                await storeUser(user);
                await storeToken(jwt);
                set({ user, jwt });
            },
            logout: async () => {
                await clearStoredAuth();
                set({ user: null, jwt: null });
            },
            isAuthenticated: () => get().user != null,
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => ({
                getItem: async (name) => {
                    const user = await getStoredUser();
                    const token = await getStoredToken();
                    return JSON.stringify({
                        state: {
                            user,
                            jwt: token,
                        },
                    });
                },
                setItem: async (name, value) => {
                },
                removeItem: async (name) => {
                },
            })),
        }
    )
);