import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Message } from 'src/app/model/message';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'pv-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
  form: FormGroup;
  users: string[] = [];
  recipients: string[] = [];

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      recipient: [''],
      subject: [''],
      message: [''],
    });
  }

  async ngOnInit() {
    this.users = await this.auth.getUsers();
  }

  addRecipient(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.recipients.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.form.controls['recipient'].setValue(null);
  }

  removeRecipient(user: string) {
    const index = this.recipients.indexOf(user);

    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
  }

  selectedRecipient(event: MatAutocompleteSelectedEvent) {
    this.recipients.push(event.option.viewValue);
    this.chipInput.nativeElement.value = '';
    this.form.controls['recipient'].setValue(null);
  }

  async send() {
    const date = new Date().toUTCString();
    for (const recipient of this.recipients) {
      const message: Message = {
        id: 0,
        recipient,
        sender: this.auth.username,
        subject: this.form.value.subject,
        body: this.form.value.message,
        date,
      };

      await this.messageService.send(message);
    }
  }
}
