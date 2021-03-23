import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanviewRoutingModule } from './planview-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { ImportsModule } from '../imports/imports.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    HomeComponent,
    SendMessageComponent,
  ],
  imports: [CommonModule, PlanviewRoutingModule, ImportsModule, SharedModule],
})
export class PlanviewModule {}
