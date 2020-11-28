import { Component, OnInit } from '@angular/core';

// Libs
import { Observable } from 'rxjs';

// Store
import { Store, select } from '@ngrx/store';
import * as LeagueSelectors from '@core/core-store/league/league.selectors';

import { LeagueInfo } from '@core/interfaces/league.interface';

@Component({
  selector: 'app-league-header',
  templateUrl: './league-header.component.html',
  styleUrls: ['./league-header.component.scss']
})
export class LeagueHeaderComponent implements OnInit {
  public leagueInfo$: Observable<LeagueInfo>;
  public mobileMenu: boolean = true;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.leagueInfo$ = this.store.pipe(select(LeagueSelectors.selectLeagueInfo));
  }

  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
  }
}
