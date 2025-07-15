export interface AuthUser {
  id: number;
  documentId: string;
  avatar: string | null;
  username: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  jwt: string | null;
  isSetupComplete: boolean;
}

export interface AuthActions {
  login: (user: AuthUser, jwt: string) => void;
  logout: () => void;
  completeSetup: () => void;
  isAuthenticated: () => boolean;
}