import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { confirmPasswordValidator } from '../../../validators/confirm-password.validator';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\S*$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#]).{8,}$/
        ),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        confirmPasswordValidator,
      ]),
    });
  }

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  handleSubmitForm() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
