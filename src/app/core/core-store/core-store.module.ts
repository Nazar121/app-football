import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Env
import { environment } from '@env/environment';

// Redux
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap } from '@ngrx/store';

// Reducers
import { LEAGUE_FEATURE_KEY, LeagueReducer, LeagueState } from './league/league.reducer';

// Effects
import { LeagueEffects } from './league/league.effects';

export interface CoreState {
  [LEAGUE_FEATURE_KEY]: LeagueState;
}

export const coreStoreReducers: ActionReducerMap<CoreState, any> = {
    [LEAGUE_FEATURE_KEY]: LeagueReducer
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Redux
    StoreModule.forRoot(coreStoreReducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([LeagueEffects])
  ]
})
export class CoreStoreModule { }
