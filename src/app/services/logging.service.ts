import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

interface RequestLogData {
    id: number;
    user_id: string;
    url: string;
    url_with_query?: string;
    timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class LoggingService {
    constructor(private http: HttpClient, private auth: AuthService) {}

    async log_request(url: string, url_with_query: string) {
        const data: RequestLogData = {
            id: 0,
            user_id: this.auth.username,
            url,
            url_with_query: url === url_with_query ? undefined : url_with_query,
            timestamp: new Date().toISOString(),
        };
        await this.http.post('/api/api-log', data).toPromise();
    }
}
