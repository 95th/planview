import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDetails } from 'model/login-details';
import { User, UserRole, UserView } from 'model/user';

export enum LoginStatus {
    Ok,
    Failed,
    Locked,
}

const TOKEN_KEY = 'access_token';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

    async loginUser(info: LoginDetails): Promise<LoginStatus> {
        this.logoutUser();
        try {
            const token = await this.http
                .post<string>('/api/auth/login', info, { responseType: 'text' as 'json' })
                .toPromise();
            localStorage.setItem(TOKEN_KEY, token);
            return LoginStatus.Ok;
        } catch (err) {
            return err.locked ? LoginStatus.Locked : LoginStatus.Failed;
        }
    }

    private get parsedToken(): { sub: string; id: number; role: string } | null {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return this.jwtHelper.decodeToken(token);
        }
        return null;
    }

    get userId(): number | undefined {
        return this.parsedToken?.id;
    }

    private get role(): string {
        return this.parsedToken?.role || '';
    }

    logoutUser() {
        localStorage.removeItem(TOKEN_KEY);
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
        return this.role === UserRole.ADMIN;
    }
}
