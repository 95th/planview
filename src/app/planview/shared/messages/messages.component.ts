import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message.service';
import { ShowMessageComponent } from '../show-message/show-message.component';

@Component({
  selector: 'pv-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  loading: boolean = true;

  constructor(private dialog: MatDialog, private msgService: MessageService) {}

  async ngOnInit() {
    await this.reload();
  }

  async reload() {
    this.loading = true;
    this.messages = await this.msgService.getMessages();
    this.loading = false;
  }

  async openMessage(message: Message) {
    const dialogRef = this.dialog.open(ShowMessageComponent, {
      width: '400px',
      data: message,
    });
    const reload = await dialogRef.afterClosed().toPromise();
    if (reload) {
      await this.reload();
    }
  }
}
