import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = this.injectAuth(req);
        return next.handle(req);
    }

    private injectAuth(req: HttpRequest<any>) {
        if (!req.url.startsWith('/api/')) {
            return req;
        }

        const token = this.auth.token;
        if (!token) {
            return req;
        }

        return req.clone({
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            }),
        });
    }
}
