import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkItem } from 'model/work-item';
import { WorkType } from 'model/work-type';
import { WorkService } from 'services/work.service';

@Component({
    selector: 'planv-create-work-item',
    templateUrl: './create-work-item.component.html',
    styleUrls: ['./create-work-item.component.scss'],
})
export class CreateWorkItemComponent implements OnInit {
    form: FormGroup;
    @ViewChild('formDirective') formDirective!: NgForm;
    showError = false;
    types: WorkType[] = [];

    constructor(private fb: FormBuilder, private workService: WorkService, private snackbar: MatSnackBar) {
        this.form = this.fb.group({
            name: [''],
            type: [''],
        });
    }

    async ngOnInit() {
        this.types = await this.workService.getTypes();
    }

    async create() {
        try {
            this.showError = false;
            const name = this.form.value.name;
            const item: WorkItem = {
                id: 0,
                name,
                workType: this.form.value.type,
            };
            await this.workService.createItem(item);
            this.formDirective.resetForm();
            this.form.reset();
            this.snackbar.open(`Work Item '${name}' created`, 'Dismiss', {
                duration: 2000,
            });
        } catch (err) {
            this.showError = true;
        }
    }
}
