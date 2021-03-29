import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'pv-show-message-dialog',
    templateUrl: './show-message.component.html',
    styleUrls: ['./show-message.component.scss'],
})
export class ShowMessageComponent {
    constructor(
        private dialogRef: MatDialogRef<ShowMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public message: Message,
        private messageService: MessageService,
        private router: Router
    ) {}

    onNoClick() {
        this.dialogRef.close();
    }

    async onReply() {
        await this.router.navigate([
            '/planview',
            'send-message',
            { to: this.message.sender, subject: 'RE: ' + this.message.subject },
        ]);
    }

    async onDelete() {
        await this.messageService.delete(this.message);
    }
}
