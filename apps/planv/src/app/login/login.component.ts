import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginStatus } from 'services/auth.service';

@Component({
    selector: 'planv-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    form: FormGroup;
    loginError = '';

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.form = this.fb.group({
            username: [''],
            password: [''],
        });
    }

    performLogin() {
        this.loginError = '';
        this.auth.loginUser(this.form.value).subscribe((status) => {
            switch (status) {
                case LoginStatus.Ok:
                    this.router.navigateByUrl('/planview/dashboard');
                    break;
                case LoginStatus.Failed:
                    this.loginError = 'Incorrect username or password';
                    break;
                case LoginStatus.Locked:
                    this.loginError = 'User is locked. Please contact the administrator';
                    break;
            }
        });
    }
}
