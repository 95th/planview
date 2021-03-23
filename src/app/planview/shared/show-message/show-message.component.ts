import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from 'src/app/model/message';

@Component({
  selector: 'pv-show-message-dialog',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss'],
})
export class ShowMessageComponent {
  constructor(
    private dialogRef: MatDialogRef<ShowMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public message: Message
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
