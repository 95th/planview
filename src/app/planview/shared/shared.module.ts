import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { ImportsModule } from 'src/app/imports/imports.module';

@NgModule({
  declarations: [MessagesComponent],
  imports: [CommonModule, ImportsModule],
  exports: [MessagesComponent],
})
export class SharedModule {}
