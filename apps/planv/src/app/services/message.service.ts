import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, MessageView } from 'model/message';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private http: HttpClient) {}

    async getInbox(): Promise<MessageView[]> {
        return await this.http.get<MessageView[]>('/api/message/inbox').toPromise();
    }

    async send(message: Message) {
        await this.http.post('/api/message', message).toPromise();
    }

    async delete(id: number) {
        await this.http.delete(`/api/message/${id}`).toPromise();
    }
}
