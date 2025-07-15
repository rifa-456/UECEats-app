import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as authStorage from "@/utils/authStorage";
import {AuthActions, AuthState} from "@/features/auth/types/userTypes";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      jwt: null,
      isSetupComplete: false,
      login: (user, jwt) => set({ user, jwt }),
      logout: () => {
        authStorage.clearStoredAuth();
        set({ user: null, jwt: null, isSetupComplete: false });
      },
      completeSetup: () => set({ isSetupComplete: true }),
      isAuthenticated: () => get().user !== null && get().jwt !== null,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ({
        setItem: async (name, value) => {
          const { state } = JSON.parse(value);
          if (state.user && state.jwt) {
            await authStorage.storeUser(state.user);
            await authStorage.storeToken(state.jwt);
          }
        },
        getItem: async (name) => {
          const user = await authStorage.getStoredUser();
          const jwt = await authStorage.getStoredToken();
          const isSetupComplete = !!user;
          return JSON.stringify({ state: { user, jwt, isSetupComplete } });
        },
        removeItem: async (name) => {
          await authStorage.clearStoredAuth();
        },
      })),
    }
  )
);