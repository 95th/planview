import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfo } from '../model/login-info.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async loginUser(info: LoginInfo): Promise<boolean> {
    let users = await this.http
      .get<User[]>('/api/users', { params: { username: info.username } })
      .toPromise();
    return users && users.length === 1 && users[0].password === info.password;
  }
}
