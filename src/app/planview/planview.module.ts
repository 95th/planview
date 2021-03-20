import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanviewRoutingModule } from './planview-routing.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [DashboardComponent, NavComponent, HomeComponent, MessagesComponent],
  imports: [CommonModule, PlanviewRoutingModule],
})
export class PlanviewModule {}
