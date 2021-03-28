import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkAssignment } from 'src/app/model/work-assignment';
import { WorkItem } from 'src/app/model/work-item';
import { AuthService } from 'src/app/services/auth.service';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'pv-create-work-assignment',
  templateUrl: './create-work-assignment.component.html',
  styleUrls: ['./create-work-assignment.component.scss'],
})
export class CreateWorkAssignmentComponent implements OnInit {
  form: FormGroup;
  @ViewChild('formDirective') formDirective: NgForm;

  users: string[] = [];
  work_items: WorkItem[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private workService: WorkService,
    private snackbar: MatSnackBar
  ) {
    this.form = this.fb.group({
      user_id: [''],
      work_items: [''],
    });
  }

  async ngOnInit() {
    const users = await this.auth.getUsers();
    this.users = users.map((u) => u.id);
    this.work_items = await this.workService.getItems();
  }

  async create() {
    const { user_id, work_items } = this.form.value;
    const assignments: WorkAssignment[] = work_items.map(
      (work_item_id: string) => {
        return {
          id: 0,
          user_id,
          work_item_id,
        };
      }
    );

    await this.workService.createAssignments(assignments);
    this.formDirective.resetForm();
    this.form.reset();
    this.snackbar.open('Work assignment created', 'Dismiss', {
      duration: 2000,
    });
  }
}
