import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
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
        username: [
          '',
          [Validators.pattern(/[a-zA-Z0-9]/), Validators.minLength(3)],
        ],
        password: ['', Validators.minLength(6)],
        password_confirmation: [''],
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
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
