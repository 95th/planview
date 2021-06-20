import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, MessageView } from 'model/message';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private http: HttpClient) {}

    getInbox(): Observable<MessageView[]> {
        return this.http.get<MessageView[]>('/api/message/inbox');
    }

    send(message: Message): Observable<void> {
        return this.http.post<void>('/api/message', message);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`/api/message/${id}`);
    }
}
