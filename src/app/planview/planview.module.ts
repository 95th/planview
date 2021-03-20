import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanviewRoutingModule } from './planview-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { SendMessageComponent } from './send-message/send-message.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    HomeComponent,
    MessagesComponent,
    SendMessageComponent,
  ],
  imports: [CommonModule, PlanviewRoutingModule],
})
export class PlanviewModule {}
