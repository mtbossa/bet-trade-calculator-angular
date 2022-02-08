import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchesService } from 'src/app/core/services/matches.service';
import { Match } from 'src/app/shared/models/match.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public matches: Match[] = [];
  public form!: FormGroup;

  constructor(
    private matchService: MatchesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._createForm();
    this.matchService.getAllMatches();
    this.matchService.matches$.subscribe((res) => {
      this.matches = [...res];
      console.log(
        '🚀 ~ file: dashboard.component.ts ~ line 21 ~ DashboardComponent ~ this.matchService.matches$.subscribe ~ this.matches',
        this.matches
      );
    });
  }

  private _createForm() {
    this.form = this.formBuilder.group({
      team_one: ['', [Validators.required, Validators.max(20)]],
      team_two: ['', Validators.required, Validators.max(20)],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.matchService.createMatch(this.form.value).subscribe({
      next: (match: Match) => {
        this.matchService.matches$.next([...this.matches, match]);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errors = {};
        this.errors = { ...errorResponse.error };
      },
    });
  }
}
