import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginStatus } from '../services/auth.service';

@Component({
  selector: 'pv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  async performLogin() {
    this.loginError = '';
    let status = await this.auth.loginUser(this.form.value);
    switch (status) {
      case LoginStatus.Ok:
        if (this.auth.isAdmin()) {
          await this.router.navigateByUrl('/admin/dashboard');
        } else {
          await this.router.navigateByUrl('/planview/dashboard');
        }
        break;
      case LoginStatus.Failed:
        this.loginError = 'Incorrect username or password';
        break;
      case LoginStatus.Locked:
        this.loginError = 'User is locked. Please contact the adminitrator';
        break;
    }
  }
}
