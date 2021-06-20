import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageView } from 'model/message';
import { MessageService } from 'services/message.service';
import { ShowMessageComponent } from '../show-message/show-message.component';

@Component({
    selector: 'planv-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
    messages: MessageView[] = [];
    loading = false;

    constructor(private dialog: MatDialog, private msgService: MessageService) {}

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.loading = true;
        this.msgService.getInbox().subscribe((msgs) => {
            this.messages = msgs;
            this.loading = false;
        });
    }

    openMessage(message: MessageView) {
        const dialogRef = this.dialog.open(ShowMessageComponent, {
            width: '400px',
            data: message,
        });
        dialogRef.afterClosed().subscribe((reload) => {
            if (reload) {
                this.reload();
            }
        });
    }
}
