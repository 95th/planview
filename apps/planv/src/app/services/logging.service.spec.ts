import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { RequestLog, RequestLogAggregate } from 'model/request-log';
import { dateToString } from 'util/date.util';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
    let httpTestingController: HttpTestingController;
    let service: LoggingService;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule, MatNativeDateModule],
            });
            httpTestingController = TestBed.inject(HttpTestingController);
            service = TestBed.inject(LoggingService);
        })
    );

    function testService(done: DoneFn, input: RequestLog[], expected: RequestLogAggregate[]) {
        const date = new Date();
        service.getRequestLogsAggregate(date).then((logs) => {
            expect(logs).toEqual(expected);
            done();
        });

        const req = httpTestingController.expectOne('/api/api-log?week_start=' + dateToString(date));
        req.flush(input);
        httpTestingController.verify();
    }

    it('should aggregate empty to empty', (done) => testService(done, [], []));

    it('should aggregate multi items with same user and url to single item', (done) => {
        const input: RequestLog[] = [
            { id: 1, url: 'url_1', user_id: 'user_1', week_start: '', timestamp: '' },
            { id: 1, url: 'url_1', user_id: 'user_1', week_start: '', timestamp: '' },
            { id: 1, url: 'url_1', user_id: 'user_1', week_start: '', timestamp: '' },
        ];
        const expected = [{ user_id: 'user_1', url: 'url_1', count: 3 }];
        testService(done, input, expected);
    });

    it('should aggregate multi items with same user and different url to multiple item', (done) => {
        const input: RequestLog[] = [
            { id: 1, url: 'url_1', user_id: 'user_1', week_start: '', timestamp: '' },
            { id: 1, url: 'url_2', user_id: 'user_1', week_start: '', timestamp: '' },
            { id: 1, url: 'url_3', user_id: 'user_1', week_start: '', timestamp: '' },
        ];
        const expected = [
            { url: 'url_1', user_id: 'user_1', count: 1 },
            { url: 'url_2', user_id: 'user_1', count: 1 },
            { url: 'url_3', user_id: 'user_1', count: 1 },
        ];
        testService(done, input, expected);
    });

    it('should aggregate multi items with different user and same url to multiple item', (done) => {
        const input: RequestLog[] = [
            { id: 1, url: 'url_1', user_id: 'user_1', week_start: '', timestamp: '' },
            { id: 1, url: 'url_1', user_id: 'user_2', week_start: '', timestamp: '' },
            { id: 1, url: 'url_1', user_id: 'user_3', week_start: '', timestamp: '' },
        ];
        const expected = [
            { url: 'url_1', user_id: 'user_1', count: 1 },
            { url: 'url_1', user_id: 'user_2', count: 1 },
            { url: 'url_1', user_id: 'user_3', count: 1 },
        ];
        testService(done, input, expected);
    });
});
