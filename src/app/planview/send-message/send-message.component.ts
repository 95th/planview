import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Message } from 'src/app/model/message';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pv-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
  form: FormGroup;
  users: string[] = [];
  filteredUsers: Observable<string[]>;
  recipients: string[] = [];

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('formDirective') formDirective: NgForm;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService,
    private snackbar: MatSnackBar
  ) {
    this.form = this.fb.group({
      recipient: [''],
      subject: [''],
      message: [''],
    });
    this.filteredUsers = this.form.controls['recipient'].valueChanges.pipe(
      map((val) => (val ? this._filter(val) : this.users.slice()))
    );
  }

  async ngOnInit() {
    this.users = await this.auth.getUsers();
  }

  addRecipient(event: MatChipInputEvent) {
    const input = event.input;
    const value = (event.value || '').trim();

    if (
      value &&
      this.users.includes(value) &&
      !this.recipients.includes(value)
    ) {
      this.recipients.push(value);
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

    this.recipients = [];
    this.formDirective.resetForm();
    this.form.reset();
    this.snackbar.open('Message sent', 'Dismiss', { duration: 2000 });
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.users.filter((u) => u.toLowerCase().indexOf(filterValue) >= 0);
  }
}
