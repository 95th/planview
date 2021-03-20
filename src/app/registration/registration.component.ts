import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'pv-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  registrationFailed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        first_name: ['', Validators.pattern(/[a-zA-Z ]/)],
        last_name: ['', Validators.pattern(/[a-zA-Z ]/)],
        date_of_birth: ['', this.checkPastDate],
        email: [''],
        address: this.fb.group({
          line_1: [''],
          line_2: [''],
          city: ['', Validators.pattern(/[a-zA-Z ]/)],
          state: ['', Validators.pattern(/[a-zA-Z ]/)],
          country: ['', Validators.pattern(/[a-zA-Z ]/)],
          zip: [''],
        }),
        id: ['', [Validators.pattern(/[a-zA-Z0-9]/), Validators.minLength(3)]],
        password: ['', Validators.minLength(6)],
        password_confirmation: [''],
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit(): void {}

  async onSubmit() {
    try {
      this.registrationFailed = false;
      let user = await this.authService.createUser(this.form.value);

      await this.authService.loginUser({
        username: user.id,
        password: user.password,
      });

      await this.router.navigateByUrl('/planview/dashboard');
    } catch (err) {
      this.registrationFailed = true;
    }
  }

  private checkPasswords(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  private checkPastDate(field: AbstractControl) {
    const date = new Date(field.value);
    return date < new Date() ? null : { invalidDate: true };
  }
}
