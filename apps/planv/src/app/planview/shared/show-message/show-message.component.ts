import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageView } from 'model/message';
import { MessageService } from 'services/message.service';

@Component({
    selector: 'planv-show-message-dialog',
    templateUrl: './show-message.component.html',
    styleUrls: ['./show-message.component.scss'],
})
export class ShowMessageComponent {
    constructor(
        private dialogRef: MatDialogRef<ShowMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public message: MessageView,
        private messageService: MessageService,
        private router: Router
    ) {}

    onNoClick() {
        this.dialogRef.close();
    }

    async onReply() {
        const origSubject = this.message.subject;
        const subject = origSubject.startsWith('RE: ') ? origSubject : 'RE: ' + origSubject;
        await this.router.navigate(['/planview', 'send-message', { to: this.message.senderName, subject }]);
    }

    async onDelete() {
        await this.messageService.delete(this.message.id);
    }
}
