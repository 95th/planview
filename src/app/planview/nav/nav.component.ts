import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pv-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  links = [
    {
      url: 'dashboard',
      label: 'Home',
    },
    {
      url: 'send-message',
      label: 'New Message',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
