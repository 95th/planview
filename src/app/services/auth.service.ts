import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfo } from '../model/login-info.model';
import { User, UserRole } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role: UserRole = 'regular';
  private username: string = '';

  constructor(private http: HttpClient) {}

  async loginUser(info: LoginInfo): Promise<boolean> {
    this.role = 'regular';
    this.username = '';

    let user = await this.http
      .get<User | undefined>(`/api/users/${info.username}`)
      .toPromise();

    if (user && user.password === info.password) {
      this.role = user.role;
      this.username = info.username;
      return true;
    }

    return false;
  }

  async createUser(user: User): Promise<User> {
    return await this.http.post<User>('/api/users', user).toPromise();
  }

  isLoggedIn(): boolean {
    return this.username ? true : false;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
