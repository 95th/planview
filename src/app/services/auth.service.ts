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
    let users = await this.http
      .get<User[]>('/api/users', {
        params: { username: info.username },
      })
      .toPromise();

    if (users.length === 1 && users[0].password === info.password) {
      this.role = users[0].role;
      this.username = info.username;
      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {
    return this.username ? true : false;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
