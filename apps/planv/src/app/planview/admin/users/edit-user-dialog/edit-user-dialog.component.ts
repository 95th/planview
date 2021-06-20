import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserView } from 'model/user';
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
        @Inject(MAT_DIALOG_DATA) private user: UserView,
        private auth: AuthService
    ) {
        this.form = this.fb.group({
            admin: [''],
            emailId: ['', Validators.email],
        });
        this.form.patchValue(this.user);
    }

    onSave() {
        const user: UserView = {
            ...this.user,
            admin: this.form.value.admin,
            emailId: this.form.value.emailId,
        };
        this.auth.updateUser(user).subscribe();
    }

    onCancel() {
        this.dialogRef.close();
    }
}
