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

    async ngOnInit() {
        await this.reload();
    }

    async reload() {
        this.loading = true;
        this.messages = await this.msgService.getInbox();
        this.loading = false;
    }

    async openMessage(message: MessageView) {
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
