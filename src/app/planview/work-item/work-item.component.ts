import { Component, OnInit } from '@angular/core';
import { WorkAssignment } from 'src/app/model/work-assignment';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'pv-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss'],
})
export class WorkItemComponent implements OnInit {
  items: WorkAssignment[] = [];
  loading: boolean = false;

  constructor(private workService: WorkService) {}

  ngOnInit() {
    this.reload();
  }

  async reload() {
    this.loading = true;
    this.items = await this.workService.getAssignedItems();
    this.loading = false;
  }
}
