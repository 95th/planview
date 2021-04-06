export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    emailId: string;
    addressLine1?: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    userName: string;
    password: string;
    role: UserRole;
    locked: boolean;
    failedTries: number;
}

export interface UserView {
    id: number;
    userName: string;
    emailId: string;
    admin: boolean;
    locked: boolean;
}
