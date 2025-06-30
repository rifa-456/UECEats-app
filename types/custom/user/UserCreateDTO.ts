export interface UserCreate {
    login: string;
    password: string;
    name: string;
    isTermAccepted?: boolean;
}