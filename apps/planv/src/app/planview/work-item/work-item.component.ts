import { Component, OnInit } from '@angular/core';
import { WorkAssignment } from 'model/work-assignment';
import { WorkService } from 'services/work.service';

@Component({
    selector: 'planv-work-item',
    templateUrl: './work-item.component.html',
    styleUrls: ['./work-item.component.scss'],
})
export class WorkItemComponent implements OnInit {
    items: WorkAssignment[] = [];
    loading = false;

    constructor(private workService: WorkService) {}

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.loading = true;
        this.workService.getAssignments().subscribe((items) => {
            this.items = items;
            this.loading = false;
        });
    }
}
