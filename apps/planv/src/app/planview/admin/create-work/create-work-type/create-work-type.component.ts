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
            name: [''],
        });
    }

    async create() {
        try {
            this.showError = false;
            const name = this.form.value.name;
            await this.workService.createType({ id: 0, name });
            this.formDirective.resetForm();
            this.form.reset();
            this.snackbar.open(`Work type ${name} is created`, 'Dismiss', {
                duration: 2000,
            });
        } catch (err) {
            this.showError = true;
        }
    }
}
