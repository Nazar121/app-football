import { createAction, props } from '@ngrx/store';
import { LeagueInfo } from '@core/interfaces/league.interface';

// LeagueInfo
export const setleagueInfo = createAction('[League Module] Set League Info', props<{payload: LeagueInfo | null | undefined}>());

// LeagueTable
export const fetchLeagueTable = createAction('[League Module] Fetch League Table', props<{payload: {season: number | string, league: number | string, forceLoad?: boolean}}>());
export const fetchLeagueTableSuccess = createAction('[League Module] Fetch League Table Success', props<{payload: any}>());
export const fetchLeagueTableError = createAction('[League Module] Fetch League Table Error', props<{payload: string}>());
