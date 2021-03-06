import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserView } from 'model/user';
import { AuthService } from 'services/auth.service';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@Component({
    selector: 'planv-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class UsersComponent implements OnInit {
    loading = true;
    displayedColumns: string[] = ['name', 'email', 'admin', 'locked'];
    users: UserView[] = [];
    expandedUser: UserView | null = null;

    constructor(private auth: AuthService, public dialog: MatDialog, private snackbar: MatSnackBar) {}

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.loading = true;
        this.auth.getUsers().subscribe((users) => {
            this.users = users;
            this.loading = false;
        });
    }

    deleteUser() {
        if (!this.expandedUser) {
            return;
        }
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            width: '300px',
            data: this.expandedUser,
        });

        dialogRef.afterClosed().subscribe((deleted) => {
            if (deleted) {
                this.reload();
            }
        });
    }

    editUser() {
        if (!this.expandedUser) {
            return;
        }

        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: this.expandedUser,
        });

        dialogRef.afterClosed().subscribe((updated) => {
            if (updated) {
                this.reload();
            }
        });
    }

    unlockUser() {
        if (!this.expandedUser) {
            return;
        }

        if (!this.expandedUser.locked) {
            this.snackbar.open(`${this.expandedUser.userName} is already unlocked`, 'Dismiss', {
                duration: 2000,
            });
            return;
        }

        this.expandedUser.locked = false;
        this.auth.updateUser(this.expandedUser).subscribe(() => {
            this.snackbar.open(`${this.expandedUser.userName} is unlocked`, 'Dismiss', {
                duration: 2000,
            });
        });
    }
}
