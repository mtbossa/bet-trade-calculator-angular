import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from 'src/app/core/services/matches.service';
import { Match } from 'src/app/shared/models/match.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  public form!: FormGroup;
  public match!: Match;

  constructor(
    private formBuilder: FormBuilder,
    private matchesService: MatchesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._createForm();
    this.activatedRoute.params.subscribe((params) => {
      this.matchesService.getSingleMatch(params['id']).subscribe((match) => {
        this.match = match;
      });
    });
  }

  private _createForm() {
    this.form = this.formBuilder.group({
      betted_team: [
        null,
        [Validators.required, Validators.min(1), Validators.max(2)],
      ],
      amount: [null, [Validators.required, Validators.max(10000000)]],
      odd: [null, [Validators.required, Validators.max(1000)]],
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.matchesService.createBet(this.match.id, this.form.value).subscribe({
      next: (bet) => {
        this.match.bets = [bet, ...this.match.bets];
        this.match = this.matchesService.calcMatchTotals(this.match);
      },
    });
  }
}
