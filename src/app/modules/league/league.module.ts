import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '@app/modules/shared/shared.module';

// Routing
import { LeagueRoutingModule } from './league-routing.module';

// Components
import { LeagueComponent } from './league.component';
import { LeagueHeaderComponent } from './components/league-header/league-header.component';

@NgModule({
  declarations: [LeagueComponent, LeagueHeaderComponent],
  imports: [
    CommonModule,
    LeagueRoutingModule,
    SharedModule
  ]
})
export class LeagueModule { }
