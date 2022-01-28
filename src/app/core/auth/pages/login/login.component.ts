import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errors = {};

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['teste@teste.com'],
      password: ['password'],
    });
  }

  onSubmit() {
    this.authService
      .logIn(this.form.value)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.authService.saveUser();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.errors = err.error.errors;
        },
      });
  }
}
