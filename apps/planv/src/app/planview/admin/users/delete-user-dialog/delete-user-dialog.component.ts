import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserView } from 'model/user';
import { AuthService } from 'services/auth.service';

@Component({
    selector: 'planv-delete-user-dialog',
    templateUrl: './delete-user-dialog.component.html',
})
export class DeleteUserDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public user: UserView, private auth: AuthService) {}

    async onDelete() {
        await this.auth.deleteUser(this.user.id);
    }
}
