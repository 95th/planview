import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkAssignmentComponent } from './create-work-assignment/create-work-assignment.component';
import { CreateWorkItemComponent } from './create-work-item/create-work-item.component';
import { CreateWorkTypeComponent } from './create-work-type/create-work-type.component';

const ROUTES: Routes = [
    { path: 'type', component: CreateWorkTypeComponent },
    { path: 'item', component: CreateWorkItemComponent },
    { path: 'assignment', component: CreateWorkAssignmentComponent },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class CreateWorkRoutingModule {}
