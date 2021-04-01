import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImportsModule } from 'imports/imports.module';
import { SharedModule } from 'planview/shared/shared.module';
import { CreateWorkAssignmentComponent } from './create-work-assignment/create-work-assignment.component';
import { CreateWorkItemComponent } from './create-work-item/create-work-item.component';
import { CreateWorkRoutingModule } from './create-work-routing.module';
import { CreateWorkTypeComponent } from './create-work-type/create-work-type.component';

@NgModule({
    declarations: [CreateWorkTypeComponent, CreateWorkItemComponent, CreateWorkAssignmentComponent],
    imports: [CommonModule, CreateWorkRoutingModule, ImportsModule, SharedModule],
})
export class CreateWorkModule {}
