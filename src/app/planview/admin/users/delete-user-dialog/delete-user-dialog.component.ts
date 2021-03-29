import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'pv-delete-user-dialog',
    templateUrl: './delete-user-dialog.component.html',
})
export class DeleteUserDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public user: User, private auth: AuthService) {}

    async onDelete() {
        await this.auth.deleteUser(this.user);
    }
}
