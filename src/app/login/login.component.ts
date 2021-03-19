import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
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
    if (success) {
      await this.router.navigate(['/dashboard']);
    } else {
      this.invalidLogin = true;
    }
  }
}
