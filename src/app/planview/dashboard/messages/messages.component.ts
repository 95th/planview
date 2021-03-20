import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';

@Component({
  selector: 'pv-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [
    {
      sender: 'admin',
      subject: 'the data',
      body: 'Whats up',
      date: '2020-01-21',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
