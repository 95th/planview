import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkType } from 'src/app/model/work-type';
import { WorkService } from 'src/app/services/work.service';

@Component({
    selector: 'pv-create-work-item',
    templateUrl: './create-work-item.component.html',
    styleUrls: ['./create-work-item.component.scss'],
})
export class CreateWorkItemComponent implements OnInit {
    form: FormGroup;
    @ViewChild('formDirective') formDirective!: NgForm;
    showError: boolean = false;
    types: WorkType[] = [];

    constructor(private fb: FormBuilder, private workService: WorkService, private snackbar: MatSnackBar) {
        this.form = this.fb.group({
            id: [''],
            description: [''],
            type: [''],
        });
    }

    async ngOnInit() {
        this.types = await this.workService.getTypes();
    }

    async create() {
        try {
            this.showError = false;
            const id = this.form.value.id;
            await this.workService.createItem(this.form.value);
            this.formDirective.resetForm();
            this.form.reset();
            this.snackbar.open(`Work Item '${id}' created`, 'Dismiss', {
                duration: 2000,
            });
        } catch (err) {
            this.showError = true;
        }
    }
}
