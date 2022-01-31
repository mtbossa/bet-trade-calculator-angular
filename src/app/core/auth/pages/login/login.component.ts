import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

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
