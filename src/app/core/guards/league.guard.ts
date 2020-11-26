import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Constants
import { CoreConstant } from '@core/constants/core.constant';

@Injectable({
  providedIn: 'root'
})
export class LeagueGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (next.params.hasOwnProperty('leagueName')) {
      let found = CoreConstant.LEAGUES_LIST.find((leagueInfo) => leagueInfo.routeLeagueName === next.params.leagueName);
      return (found) ? true : false;
    } else {
      return false;
    }
  }
}
