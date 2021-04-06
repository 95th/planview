import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserView } from 'model/user';
import { WorkAssignment } from 'model/work-assignment';
import { WorkItem } from 'model/work-item';
import { AuthService } from 'services/auth.service';
import { WorkService } from 'services/work.service';

@Component({
    selector: 'planv-create-work-assignment',
    templateUrl: './create-work-assignment.component.html',
    styleUrls: ['./create-work-assignment.component.scss'],
})
export class CreateWorkAssignmentComponent implements OnInit {
    form: FormGroup;
    @ViewChild('formDirective') formDirective!: NgForm;

    users: UserView[] = [];
    workItems: WorkItem[] = [];

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private workService: WorkService,
        private snackbar: MatSnackBar
    ) {
        this.form = this.fb.group({
            userId: [''],
            workItems: [''],
        });
    }

    async ngOnInit() {
        this.users = await this.auth.getUsers();
        this.workItems = await this.workService.getItems();
    }

    async create() {
        const { userId, workItems } = this.form.value;
        const assignments: WorkAssignment[] = [];

        for (const workItem of workItems) {
            assignments.push({
                id: 0,
                userId,
                workItem,
            });
        }

        await this.workService.createAssignments(assignments);
        this.formDirective.resetForm();
        this.form.reset();
        this.snackbar.open('Work assignment created', 'Dismiss', {
            duration: 2000,
        });
    }
}
