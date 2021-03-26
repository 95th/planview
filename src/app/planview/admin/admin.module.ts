import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImportsModule } from 'src/app/imports/imports.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteUserDialogComponent } from './users/delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './users/edit-user-dialog/edit-user-dialog.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    DeleteUserDialogComponent,
    EditUserDialogComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ImportsModule],
})
export class AdminModule {}
