import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LEAGUE_FEATURE_KEY, LeagueState} from './league.reducer';

export const selectFeature = createFeatureSelector<LeagueState>(LEAGUE_FEATURE_KEY);
export const selectLeagueInfo = createSelector(selectFeature, state => state.leagueInfo);
