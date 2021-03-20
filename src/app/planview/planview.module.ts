import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanviewRoutingModule } from './planview-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, PlanviewRoutingModule],
})
export class PlanviewModule {}
