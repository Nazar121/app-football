import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '@app/modules/shared/shared.module';

// Routing
import { LeagueRoutingModule } from './league-routing.module';

// Components
import { LeagueComponent } from './league.component';
import { LeagueHeaderComponent } from './components/league-header/league-header.component';
import { TablesComponent } from './pages/tables/tables.component';
import { LeagueTableComponent } from './components/league-table/league-table.component';

@NgModule({
  declarations: [LeagueComponent, LeagueHeaderComponent, TablesComponent, LeagueTableComponent],
  imports: [
    CommonModule,
    LeagueRoutingModule,
    SharedModule
  ]
})
export class LeagueModule { }
