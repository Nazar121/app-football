import { Component, OnInit } from '@angular/core';

// Store
import { Store, select } from '@ngrx/store';
import * as LeagueSelectors from '@core/core-store/league/league.selectors';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(LeagueSelectors.selectLeagueInfo)).subscribe(res => {
      console.log('selectLeagueInfo ', res);
    });
  }

}
