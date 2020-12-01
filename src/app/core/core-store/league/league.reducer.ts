import { createReducer, on } from '@ngrx/store';
import * as LeagueActions from './league.actions';
import { LeagueInfo } from '@core/interfaces/league.interface';

export const LEAGUE_FEATURE_KEY = 'league';

export interface LeagueAction {
    payload: any;
    type?: string;
}

export interface LeagueTableState {
    loaded: boolean;
    error: string;
    data: any;
}

export interface LeagueState {
    leagueInfo: LeagueInfo;
    leagueTable: LeagueTableState;
}

const initialState: LeagueState = {
    leagueInfo: null,
    leagueTable: {
        loaded: false,
        error: null,
        data: null
    }
};

export const LeagueReducer = createReducer(
    initialState,
    // LeagueInfo
    on(LeagueActions.setleagueInfo, (state, action: LeagueAction) => ({
        ...state,
        leagueInfo: (action.payload) ? {...action.payload} : null
    })),
    // LeagueTable
    on(LeagueActions.fetchLeagueTable, (state) => ({
        ...state,
    })),
    on(LeagueActions.fetchLeagueTableSuccess, (state, action: LeagueAction) => ({
        ...state,
        leagueTable: {
            loaded: true,
            data: action.payload,
            error: null
        }
    })),
    on(LeagueActions.fetchLeagueTableError, (state, action: LeagueAction) => ({
        ...state,
        leagueTable: {
            loaded: false,
            data: null,
            error: action.payload
        }
    })),
);
