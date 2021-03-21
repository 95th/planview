import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'pv-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor(private msgService: MessageService) {}

  async ngOnInit() {
    this.messages = await this.msgService.getMessages();
  }
}
