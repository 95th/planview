import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'model/message';
import { UserView } from 'model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'services/auth.service';
import { MessageService } from 'services/message.service';

@Component({
    selector: 'planv-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
    form: FormGroup;
    users: UserView[] = [];
    filteredUsers: Observable<UserView[]>;
    recipientInputField: FormControl;

    @ViewChild('chipInput') chipInput!: ElementRef<HTMLInputElement>;
    @ViewChild('formDirective') formDirective!: NgForm;
    @ViewChild('messageInput') messageInput!: MatInput;
    recipientList: FormArray;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private messageService: MessageService,
        private snackbar: MatSnackBar,
        private route: ActivatedRoute
    ) {
        this.form = this.fb.group({
            recipients: this.fb.array([], this.arrayNotEmpty),
            subject: [''],
            message: [''],
        });

        this.recipientInputField = new FormControl();
        this.recipientList = this.form.controls['recipients'] as FormArray;

        this.filteredUsers = this.recipientInputField.valueChanges.pipe(
            map((val) => (val ? this._filter(val) : this.users.slice()))
        );
    }

    async ngOnInit() {
        this.users = await this.auth.getUsers();
        this.route.paramMap.subscribe((params) => {
            if (params.has('to') && params.has('subject')) {
                this.recipientList.push(this.fb.control(params.get('to')));
                this.form.patchValue({ subject: params.get('subject') });
                this.messageInput.focus();
            }
        });
    }

    addRecipient(event: MatChipInputEvent) {
        const input = event.input;
        const value = (event.value || '').trim();
        this._addRecipient(value);

        if (input) {
            input.value = '';
        }

        this.recipientInputField.setValue(null);
    }

    removeRecipient(index: number) {
        if (index >= 0) {
            this.recipientList.removeAt(index);
        }
    }

    selectedRecipient(event: MatAutocompleteSelectedEvent) {
        const value = event.option.value;
        this._addRecipient(value);
        this.chipInput.nativeElement.value = '';
        this.recipientInputField.setValue(null);
    }

    async send() {
        const date = new Date().toISOString();
        for (const recipientName of this.recipientList.value) {
            const recipient = this.users.find((u) => u.userName == recipientName);
            const message: Message = {
                id: 0,
                recipient: recipient.id,
                sender: this.auth.userId,
                subject: this.form.value.subject,
                body: this.form.value.message,
                date,
            };

            await this.messageService.send(message);
        }

        this.recipientList.clear();
        this.formDirective.resetForm();
        this.form.reset();
        this.snackbar.open('Message sent', 'Dismiss', { duration: 2000 });
    }

    private _addRecipient(userName: string) {
        if (!userName) {
            return;
        }

        if (this.users.findIndex((u) => u.userName === userName) === -1) {
            return;
        }

        if (this.recipientList.value.includes(userName)) {
            return;
        }

        this.recipientList.push(this.fb.control(userName));
    }

    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.users.filter((u) => u.userName.toLowerCase().indexOf(filterValue) >= 0);
    }

    arrayNotEmpty(c: AbstractControl) {
        if (c.value && c.value.length === 0) {
            return { valid: false };
        }
        return null;
    }
}
