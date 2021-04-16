import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from 'model/login-details';
import { User, UserRole, UserView } from 'model/user';

export enum LoginStatus {
    Ok,
    Failed,
    Locked,
}

const TOKEN_KEY = 'access_token';
const ROLE_KEY = 'role';

interface AuthResponse {
    token: string;
    role: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    async loginUser(info: LoginDetails): Promise<LoginStatus> {
        this.logoutUser();
        try {
            const resp = await this.http.post<AuthResponse>('/api/auth/login', info).toPromise();
            localStorage.setItem(TOKEN_KEY, resp.token);
            localStorage.setItem(ROLE_KEY, resp.role);
            return LoginStatus.Ok;
        } catch (err) {
            return err.locked ? LoginStatus.Locked : LoginStatus.Failed;
        }
    }

    get token(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    private get role(): string | null {
        return localStorage.getItem(ROLE_KEY);
    }

    logoutUser() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
    }

    async registerUser(user: User): Promise<void> {
        await this.http.post('/api/auth/register', user).toPromise();
    }

    async getUsers(): Promise<UserView[]> {
        return await this.http.get<UserView[]>('/api/user').toPromise();
    }

    async updateUser(user: UserView): Promise<UserView> {
        return await this.http.put<UserView>(`/api/user`, user).toPromise();
    }

    async deleteUser(userId: number): Promise<void> {
        await this.http.delete(`/api/user/${userId}`).toPromise();
    }

    get isAdmin(): boolean {
        return this.token && this.role === UserRole.ADMIN;
    }
}
