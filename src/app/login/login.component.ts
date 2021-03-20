import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'pv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  async performLogin() {
    this.invalidLogin = false;
    let success = await this.authService.loginUser(this.form.value);
    if (!success) {
      this.invalidLogin = true;
      return;
    }

    if (this.authService.isAdmin()) {
      await this.router.navigateByUrl('/admin/dashboard');
    } else {
      await this.router.navigateByUrl('/planview/dashboard');
    }
  }
}
