import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggingService } from 'services/logging.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private logService: LoggingService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (req.url !== '/api/log') {
            this.logService.logRequest(req.url, req.urlWithParams);
        }
        return next.handle(req);
    }
}
