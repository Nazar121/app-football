import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Constants
import { CoreConstant } from '@core/constants/core.constant';

// Store
import { Store } from '@ngrx/store';
import * as LeagueActions from '@core/core-store/league/league.actions';

@Injectable({
  providedIn: 'root'
})
export class LeagueGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let foundLeagueInfo = null;

    if (next.params.hasOwnProperty('leagueName')) {
      foundLeagueInfo = CoreConstant.LEAGUES_LIST.find((leagueInfo) => leagueInfo.routeLeagueName === next.params.leagueName);
    }

    this.store.dispatch(LeagueActions.setleagueInfo({payload: foundLeagueInfo}));
    return (foundLeagueInfo) ? true : false;
  }
}
