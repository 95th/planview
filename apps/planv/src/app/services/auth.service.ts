import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from 'model/login-details';
import { User, UserRole, UserView } from 'model/user';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

    loginUser(info: LoginDetails): Observable<LoginStatus> {
        this.logoutUser();
        return this.http.post<AuthResponse>('/api/auth/login', info).pipe(
            map((resp) => {
                localStorage.setItem(TOKEN_KEY, resp.token);
                localStorage.setItem(ROLE_KEY, resp.role);
                return LoginStatus.Ok;
            }),
            catchError((err) => of(err.locked ? LoginStatus.Locked : LoginStatus.Failed))
        );
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

    registerUser(user: User): Observable<void> {
        return this.http.post<void>('/api/auth/register', user);
    }

    getUsers(): Observable<UserView[]> {
        return this.http.get<UserView[]>('/api/user');
    }

    updateUser(user: UserView): Observable<UserView> {
        return this.http.put<UserView>(`/api/user`, user);
    }

    deleteUser(userId: number): Observable<void> {
        return this.http.delete<void>(`/api/user/${userId}`);
    }

    get isAdmin(): boolean {
        return this.token && this.role === UserRole.ADMIN;
    }
}
