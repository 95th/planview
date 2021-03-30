import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsabilityReportComponent } from './usability-report/usability-report.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'create-work',
        loadChildren: () => import('./create-work/create-work.module').then((m) => m.CreateWorkModule),
    },
    { path: 'usability', component: UsabilityReportComponent },
    { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
