import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { JwtModule } from '@auth0/angular-jwt';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
    let httpTestingController: HttpTestingController;
    let service: LoggingService;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, MatNativeDateModule, JwtModule.forRoot({}), JwtModule.forRoot({})],
            });
            httpTestingController = TestBed.inject(HttpTestingController);
            service = TestBed.inject(LoggingService);
        })
    );

    it('should aggregate empty to empty', () => {
        expect(httpTestingController).toBeTruthy();
        expect(service).toBeTruthy();
    });
});
