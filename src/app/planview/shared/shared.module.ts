import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImportsModule } from 'src/app/imports/imports.module';
import { MessagesComponent } from './messages/messages.component';
import { ShowMessageComponent } from './show-message/show-message.component';
import { WeekSelectorComponent } from './week-selector/week-selector.component';

@NgModule({
  declarations: [
    MessagesComponent,
    ShowMessageComponent,
    WeekSelectorComponent,
  ],
  imports: [CommonModule, ImportsModule, FormsModule],
  exports: [MessagesComponent, WeekSelectorComponent],
})
export class SharedModule {}
