import { createAction, props } from '@ngrx/store';
import { LeagueInfo } from '@core/interfaces/league.interface';

export const setleagueInfo = createAction('[League Module] Set League Info', props<{payload: LeagueInfo | null | undefined}>());
