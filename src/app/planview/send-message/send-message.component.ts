import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    filteredUsers: Observable<string[]>;
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
        const users = await this.auth.getUsers();
        this.users = users.map((u) => u.id);
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
        const value = event.option.viewValue;
        this._addRecipient(value);
        this.chipInput.nativeElement.value = '';
        this.recipientInputField.setValue(null);
    }

    async send() {
        const date = new Date().toUTCString();
        for (const recipient of this.recipientList.value) {
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

        this.recipientList.clear();
        this.formDirective.resetForm();
        this.form.reset();
        this.snackbar.open('Message sent', 'Dismiss', { duration: 2000 });
    }

    private _addRecipient(value: string) {
        if (value && this.users.includes(value) && !this.recipientList.value.includes(value)) {
            this.recipientList.push(this.fb.control(value));
        }
    }

    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.users.filter((u) => u.toLowerCase().indexOf(filterValue) >= 0);
    }

    arrayNotEmpty(c: AbstractControl) {
        if (c.value && c.value.length === 0) {
            return { valid: false };
        }
        return null;
    }
}
