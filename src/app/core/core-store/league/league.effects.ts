import { Injectable} from '@angular/core';

// Services
import { LeagueService } from '@core/services/league.service';

// Redux
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as LeagueActions from '@core/core-store/league/league.actions';
import * as LeagueSelectors from '@core/core-store/league/league.selectors';

// Libs
import { exhaustMap, catchError, withLatestFrom, filter, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LeagueEffects {
    
    fetchLeagueTable$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LeagueActions.fetchLeagueTable),
            withLatestFrom(
                this.store.pipe(
                    select(LeagueSelectors.selectLeagueTable),
                    map(leagueTable => leagueTable)
                )
            ),
            filter((action) => {
                let payload = action[0].payload;
                let leagueTable = action[1];
                if (payload.forceLoad) {
                    return true;
                } else {
                    return !leagueTable.loaded;
                }
            }),
            exhaustMap(
                (action) => {
                    let payload = action[0].payload;
                    return this.leagueService.getLeagueTable({season: payload.season, league: payload.league})
                        .pipe(
                            map((res) => LeagueActions.fetchLeagueTableSuccess({payload: res})),
                            catchError((err) => of(LeagueActions.fetchLeagueTableError({payload: err})))
                        );
                }
            )
        )
    });

    constructor(
        private actions$: Actions,
        private store: Store,
        private leagueService: LeagueService
    ) {}
}