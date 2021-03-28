import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImportsModule } from '../imports/imports.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { PlanviewRoutingModule } from './planview-routing.module';
import { SendMessageComponent } from './send-message/send-message.component';
import { SharedModule } from './shared/shared.module';
import { WorkItemComponent } from './work-item/work-item.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    HomeComponent,
    SendMessageComponent,
    WorkItemComponent,
    TimesheetComponent,
  ],
  imports: [CommonModule, PlanviewRoutingModule, ImportsModule, SharedModule],
})
export class PlanviewModule {}
