import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { RequestLog } from 'src/app/model/request-log';
import { LoggingService } from 'src/app/services/logging.service';

interface RequestLogAggregate {
    user_id: string;
    url: string;
    count: number;
}

@Component({
    selector: 'pv-usability-report',
    templateUrl: './usability-report.component.html',
    styleUrls: ['./usability-report.component.scss'],
})
export class UsabilityReportComponent {
    dateRange: DateRange<Date>;
    loading: boolean = false;
    logs: RequestLogAggregate[] = [];

    displayedColumns: string[] = ['user_id', 'url', 'count'];

    constructor(private dateAdapter: DateAdapter<Date>, private logService: LoggingService) {
        this.dateRange = this.getCurrentWeek();
        this.reload();
    }

    async reload() {
        this.loading = true;
        const weekStart = this.dateRange.start || new Date();
        const logs = await this.logService.getRequestLogs(weekStart);
        this.logs = aggregate(logs);
        this.loading = false;
    }

    private getCurrentWeek(): DateRange<Date> {
        const date = new Date();
        const day = this.dateAdapter.getDayOfWeek(date);
        const start = this.dateAdapter.addCalendarDays(date, 1 - day);
        const end = this.dateAdapter.addCalendarDays(start, 4);
        return new DateRange(start, end);
    }
}

function aggregate(logs: RequestLog[]): RequestLogAggregate[] {
    const map = new Map<string, Map<string, number>>();
    for (const log of logs) {
        let requests = map.get(log.user_id);
        if (!requests) {
            requests = new Map<string, number>();
            map.set(log.user_id, requests);
        }

        const count = requests.get(log.url) || 0;
        requests.set(log.url, count + 1);
    }
    const out: RequestLogAggregate[] = [];
    for (const user_id of map.keys()) {
        const requests = map.get(user_id);
        if (!requests) {
            continue;
        }

        for (const url of requests.keys()) {
            const count = requests.get(url) || 0;
            out.push({
                user_id: user_id,
                url,
                count,
            });
        }
    }
    return out;
}
