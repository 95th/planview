import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  async getMessages(): Promise<Message[]> {
    if (!this.auth.isLoggedIn()) {
      return [];
    }

    return await this.http
      .get<Message[]>('/api/messages', {
        params: { recipient: this.auth.username },
      })
      .toPromise();
  }
}