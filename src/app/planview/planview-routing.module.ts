import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SendMessageComponent } from './send-message/send-message.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'send-message', component: SendMessageComponent },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        // canActivate: [AdminAuthGuard],
      },
      {
        path: 'work/create',
        loadChildren: () =>
          import('./create-work/create-work.module').then(
            (m) => m.CreateWorkModule
          ),
        // canActivate: [AdminAuthGuard],
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanviewRoutingModule {}
