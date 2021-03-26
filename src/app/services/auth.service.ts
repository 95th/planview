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
  constructor(private http: HttpClient) {}

  async loginUser(info: LoginInfo): Promise<LoginStatus> {
    try {
      // I know it's bad but we dont have a real backend here.
      let user = await this.http
        .get<User>(`/api/users/${info.username}`)
        .toPromise();

      if (!user.locked && user.password === info.password) {
        if (user.failed_tries > 0) {
          user.failed_tries = 0;
          await this.http.put(`/api/users/${user.id}`, user).toPromise();
        }

        localStorage.setItem('username', info.username);
        localStorage.setItem('role', user.role); // Again it's bad!!
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

  get username(): string {
    return localStorage.getItem('username');
  }

  private get role(): string {
    return localStorage.getItem('username');
  }

  logoutUser() {
    localStorage.setItem('username', '');
    localStorage.setItem('role', 'regular');
  }

  async createUser(user: User): Promise<User> {
    return await this.http.post<User>('/api/users', user).toPromise();
  }

  async getUsers(): Promise<User[]> {
    const users = await this.http.get<User[]>('/api/users').toPromise();
    return users.filter((u) => u.id !== this.username);
  }

  async updateUser(user: User) {
    await this.http.put(`/api/users/${user.id}`, user).toPromise();
  }

  async deleteUser(user: User) {
    await this.http.delete(`/api/users/${user.id}`).toPromise();
  }

  isLoggedIn(): boolean {
    return this.username ? true : false;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
