import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'model/user';
import { AuthService } from 'services/auth.service';

@Component({
    selector: 'planv-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EditUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private user: User,
        private auth: AuthService
    ) {
        this.form = this.fb.group({
            role: [''],
            email: ['', Validators.email],
        });
        this.form.patchValue(this.user);
    }

    async onSave() {
        const user = {
            ...this.user,
            role: this.form.value.role,
            email: this.form.value.email,
        };
        await this.auth.updateUser(user);
    }

    onCancel() {
        this.dialogRef.close();
    }
}
