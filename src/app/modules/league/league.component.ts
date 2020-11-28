import { Component, OnInit } from '@angular/core';

// Store
import { Store, select } from '@ngrx/store';
import * as LeagueSelectors from '@core/core-store/league/league.selectors';

// Interfaces
import { LeagueInfo } from '@core/interfaces/league.interface';

// Libs
import { Observable } from 'rxjs';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit  {
  public leagueInfo$: Observable<LeagueInfo>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.leagueInfo$ = this.store.pipe(select(LeagueSelectors.selectLeagueInfo));
  }
}
