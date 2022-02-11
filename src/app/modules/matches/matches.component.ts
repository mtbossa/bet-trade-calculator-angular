import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from 'src/app/core/services/matches.service';
import { Bet } from 'src/app/shared/models/bet.model';
import { Match } from 'src/app/shared/models/match.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  public form!: FormGroup;
  public formWinner!: FormGroup;
  public match?: Match;
  public teamOneBets: Array<Bet> = [];
  public teamTwoBets: Array<Bet> = [];

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
        this.teamOneBets = this.getTeamBets(1);
        this.teamTwoBets = this.getTeamBets(1);
      });
    });
  }

  private _createForm() {
    this.form = this.formBuilder.group({
      betted_team: [
        null,
        [Validators.required, Validators.min(1), Validators.max(2)],
      ],
      amount: [
        null,
        [Validators.required, Validators.min(0.05), Validators.max(10000000)],
      ],
      odd: [
        null,
        [Validators.required, Validators.min(1.01), Validators.max(1000)],
      ],
    });

    this.formWinner = this.formBuilder.group({
      winner_team: [
        null,
        [Validators.required, Validators.min(1), Validators.max(2)],
      ],
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.matchesService.createBet(this.match!.id, this.form.value).subscribe({
      next: (bet) => {
        this.match!.bets = [bet, ...this.match!.bets];
        this.match = { ...this.matchesService.calcMatchTotals(this.match!) };
      },
    });
  }

  public onSubmitWinner() {
    if (this.formWinner.invalid) {
      return;
    }

    this.matchesService
      .updateMatch(this.match!.id, { ...this.match, ...this.formWinner.value })
      .subscribe({
        next: (match) => {
          this.match = { ...match };
        },
      });
  }

  public getTeamBets(team: number) {
    return this.match!.bets.filter((bet) => bet.betted_team === team);
  }

  public onBetDelete(betId: number) {
    this.matchesService.deleteBet(betId).subscribe(() => {
      this.match!.bets = this.match!.bets.filter((bet) => bet.id !== betId);
      this.match = { ...this.matchesService.calcMatchTotals(this.match!) };
    });
  }
}
