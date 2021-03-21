import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfo } from '../model/login-info';
import { User, UserRole } from '../model/user';

export enum LoginStatus {
  Ok,
  Failed,
  Locked,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role: UserRole = 'regular';
  private username: string = '';

  constructor(private http: HttpClient) {}

  async loginUser(info: LoginInfo): Promise<LoginStatus> {
    this.role = 'regular';
    this.username = '';

    try {
      // I know it's bad but we dont have a real backend here.
      let user = await this.http
        .get<User>(`/api/users/${info.username}`)
        .toPromise();

      if (!user.locked && user.password === info.password) {
        this.role = user.role;
        this.username = info.username;
        return LoginStatus.Ok;
      }

      user.failed_tries++;
      if (user.failed_tries >= 3) {
        user.locked = true;
      }

      await this.http.put(`/api/users/${user.id}`, user).toPromise();

      if (user.locked) {
        return LoginStatus.Locked;
      }
    } catch (err) {}

    return LoginStatus.Failed;
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
