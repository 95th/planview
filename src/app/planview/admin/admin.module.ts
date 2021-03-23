import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ImportsModule } from 'src/app/imports/imports.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ImportsModule],
})
export class AdminModule {}
