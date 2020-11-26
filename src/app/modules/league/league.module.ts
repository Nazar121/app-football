import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { LeagueRoutingModule } from './league-routing.module';

// Components
import { LeagueComponent } from './league.component';

@NgModule({
  declarations: [LeagueComponent],
  imports: [
    CommonModule,
    LeagueRoutingModule
  ]
})
export class LeagueModule { }
