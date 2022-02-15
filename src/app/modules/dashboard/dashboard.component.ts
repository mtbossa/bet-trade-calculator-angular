import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchesService } from 'src/app/core/services/matches.service';
import { Match } from 'src/app/shared/models/match.model';
import { faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public matches: Match[] = [];
  public form!: FormGroup;
  public filterForm!: FormGroup;
  public showForm: boolean = false;

  public faCaretDown = faCaretDown;
  public faCaretLeft = faCaretLeft;

  constructor(
    private matchService: MatchesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._createForm();
    this._createFilterForm();
    this.matchService.getAllMatches();
    this.matchService.matches$.subscribe((matches) => {
      this.matches = [...matches];
    });
  }

  public onDelete(event: number) {
    this.matchService.deleteMatch(event).subscribe((res) => {
      this.matchService.matches$.next(
        this.matches.filter((match) => match.id !== event)
      );
    });
  }

  private _createForm() {
    this.form = this.formBuilder.group({
      team_one: ['', [Validators.required, Validators.max(20)]],
      team_two: ['', [Validators.required, Validators.max(20)]],
    });
  }

  private _createFilterForm() {
    this.filterForm = this.formBuilder.group({
      match_status: ['all'],
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.matchService.createMatch(this.form.value).subscribe({
      next: (match: Match) => {
        this.matchService.matches$.next([match, ...this.matches]);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      },
    });
  }

  public onFilter() {
    let params = {};
    switch (this.filterForm.value.match_status) {
      case 'finished':
        params = { ...params, match_finished: true };
        break;
      case 'onGoing':
        params = { ...params, match_finished: false };
        break;
      default:
        params = { ...params };
        break;
    }
    this.matchService.getAllMatches(params);
  }
}
