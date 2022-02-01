import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  errors = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['teste@teste.com'],
      password: ['password'],
    });
  }

  onSubmit() {
    this.authService.logIn(this.form.value).subscribe({
      next: () => {
        this.authService
          .storeUser()
          .subscribe(() => this.router.navigate(['/dashboard']));
      },
      error: (err) => {
        this.errors = err.error.errors;
      },
    });
  }
}
