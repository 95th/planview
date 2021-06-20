import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'services/auth.service';

@Component({
    selector: 'planv-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
    form: FormGroup;
    registrationFailed = false;

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.form = this.fb.group(
            {
                firstName: ['', Validators.pattern(/[a-zA-Z ]/)],
                lastName: ['', Validators.pattern(/[a-zA-Z ]/)],
                dateOfBirth: ['', this.checkPastDate],
                emailId: ['', Validators.email],
                addressLine1: [''],
                addressLine2: [''],
                city: ['', Validators.pattern(/[a-zA-Z ]/)],
                state: ['', Validators.pattern(/[a-zA-Z ]/)],
                country: ['', Validators.pattern(/[a-zA-Z ]/)],
                zip: [''],
                userName: ['', [Validators.pattern(/[a-zA-Z0-9]/), Validators.minLength(3)]],
                password: ['', Validators.minLength(6)],
                passwordConfirmation: [''],
            },
            { validators: this.checkPasswords }
        );

        this.form.valueChanges.subscribe(() => (this.registrationFailed = false));
    }

    onSubmit() {
        this.registrationFailed = false;
        this.auth
            .registerUser(this.form.value)
            .pipe(
                mergeMap(() =>
                    this.auth.loginUser({
                        username: this.form.value.userName,
                        password: this.form.value.password,
                    })
                )
            )
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/planview/dashboard');
                },
                error: () => {
                    this.registrationFailed = true;
                },
            });
    }

    private checkPasswords(form: AbstractControl) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('passwordConfirmation')?.value;

        return password === confirmPassword ? null : { notSame: true };
    }

    private checkPastDate(field: AbstractControl) {
        const date = new Date(field.value);
        return date < new Date() ? null : { invalidDate: true };
    }
}
