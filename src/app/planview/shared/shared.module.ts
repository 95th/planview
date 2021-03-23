import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { ImportsModule } from 'src/app/imports/imports.module';
import { ShowMessageComponent } from './show-message/show-message.component';

@NgModule({
  declarations: [MessagesComponent, ShowMessageComponent],
  imports: [CommonModule, ImportsModule],
  exports: [MessagesComponent],
})
export class SharedModule {}
