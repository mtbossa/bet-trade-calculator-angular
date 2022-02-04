import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface LoginErrors<T> {
  message?: string;
  errors?: T;
}

type LoginFormErrors = { email?: Array<string>; password?: Array<string> };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formSubmitted = false;
  errors: LoginErrors<LoginFormErrors> = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    this.errors = {};
    this.form.get('email')?.markAsUntouched();
    this.form.get('password')?.markAsUntouched();

    if (this.form.invalid) {
      return;
    }

    this.authService.logIn(this.form.value).subscribe({
      next: () => {
        this.authService
          .storeUser()
          .subscribe(() => this.router.navigate(['/dashboard']));
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errors = {};
        this.errors = { ...errorResponse.error };
      },
    });
  }

  onInput() {
    this.formSubmitted = false;
  }

  getServerError(property: keyof LoginFormErrors): string | boolean {
    if (this.errors.errors && this.errors.errors[property]) {
      const fieldErrorArray = this.errors.errors[property];
      if (fieldErrorArray) {
        return fieldErrorArray[0];
      }
    }

    if (this.errors.message) {
      return this.errors.message;
    }

    return false;
  }

  hasError(field: string, errorType?: string) {
    if (!this.formSubmitted) return false;

    if (!errorType && this.form.get(field)?.invalid) {
      return true;
    }

    const error = errorType as keyof AbstractControl;
    return (
      this.form.get(field)?.errors?.[error] &&
      this.formSubmitted &&
      this.form.get(field)?.untouched
    );
  }
}
