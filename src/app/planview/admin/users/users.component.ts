import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'pv-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersComponent implements OnInit {
  loading: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'admin', 'locked'];
  users: User[] = [];
  expandedUser: User | null;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reload();
  }

  async reload() {
    this.loading = true;
    this.users = await this.auth.getUsers();
    this.loading = false;
  }

  async deleteUser() {
    if (!this.expandedUser) {
      return;
    }
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '300px',
      data: this.expandedUser,
    });
    const deleted = await dialogRef.afterClosed().toPromise();
    if (deleted) {
      await this.reload();
    }
  }

  async editUser() {
    if (!this.expandedUser) {
      return;
    }

    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: this.expandedUser,
    });
    const updated = await dialogRef.afterClosed().toPromise();
    if (updated) {
      await this.reload();
    }
  }

  async unlockUser() {
    if (!this.expandedUser) {
      return;
    }

    if (!this.expandedUser.locked) {
      this.snackbar.open(
        `${this.expandedUser.id} is already unlocked`,
        'Dismiss',
        {
          duration: 2000,
        }
      );
      return;
    }

    this.expandedUser.locked = false;
    this.expandedUser.failed_tries = 0;
    await this.auth.updateUser(this.expandedUser);
    this.snackbar.open(`${this.expandedUser.id} is now unlocked`, 'Dismiss', {
      duration: 2000,
    });
  }
}