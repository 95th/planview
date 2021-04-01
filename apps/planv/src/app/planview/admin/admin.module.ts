import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImportsModule } from 'imports/imports.module';
import { SharedModule } from 'planview/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubmittedTimesheetsComponent } from './submitted-timesheets/submitted-timesheets.component';
import { UsabilityReportComponent } from './usability-report/usability-report.component';
import { DeleteUserDialogComponent } from './users/delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './users/edit-user-dialog/edit-user-dialog.component';
import { UsersComponent } from './users/users.component';

@NgModule({
    declarations: [
        DashboardComponent,
        UsersComponent,
        DeleteUserDialogComponent,
        EditUserDialogComponent,
        SubmittedTimesheetsComponent,
        UsabilityReportComponent,
    ],
    imports: [CommonModule, AdminRoutingModule, SharedModule, ImportsModule],
})
export class AdminModule {}
