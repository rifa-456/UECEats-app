import {UserType} from "@/types/strapiTypes";

export type AuthState = {
    user: UserType | null;
    setUser: (user: UserType) => void;
    jwt: string | null;
    login: (user: any, jwt: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    setAuthToken: (jwt: string) => void;
};