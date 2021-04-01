import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkService } from 'services/work.service';

@Component({
    selector: 'planv-create-work-type',
    templateUrl: './create-work-type.component.html',
    styleUrls: ['./create-work-type.component.scss'],
})
export class CreateWorkTypeComponent {
    form: FormGroup;
    @ViewChild('formDirective') formDirective!: NgForm;
    showError = false;

    constructor(private fb: FormBuilder, private workService: WorkService, private snackbar: MatSnackBar) {
        this.form = this.fb.group({
            id: [''],
            description: [''],
        });
    }

    async create() {
        try {
            this.showError = false;
            const id = this.form.value.id;
            await this.workService.createType(this.form.value);
            this.formDirective.resetForm();
            this.form.reset();
            this.snackbar.open(`Work type '${id}' created`, 'Dismiss', {
                duration: 2000,
            });
        } catch (err) {
            this.showError = true;
        }
    }
}
