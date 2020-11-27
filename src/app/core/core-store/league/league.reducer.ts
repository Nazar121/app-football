import { createReducer, on } from '@ngrx/store';
import * as LeagueActions from './league.actions';
import { LeagueInfo } from '@core/interfaces/league.interface';

export const LEAGUE_FEATURE_KEY = 'league';

export interface LeagueAction {
    payload: LeagueInfo | null | undefined;
    type?: string;
}

export interface LeagueState {
    leagueInfo: LeagueInfo;
}

const initialState: LeagueState = {
    leagueInfo: null
};

export const LeagueReducer = createReducer(
    initialState,
    on(LeagueActions.setleagueInfo, (state, action: LeagueAction) => ({
        ...state,
        leagueInfo: (action.payload) ? {...action.payload} : null
    })),
);
