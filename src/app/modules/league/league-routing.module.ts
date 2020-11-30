import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { LeagueGuard } from '@core/guards/league.guard';

// Components
import { LeagueComponent } from './league.component';
import { TablesComponent } from './pages/tables/tables.component';

const routes: Routes = [
  {
    path: 'league/:leagueName',
    component: LeagueComponent,
    canActivate: [LeagueGuard],
    children: [
      {
        path: '',
        redirectTo: 'tables'
      },
      {
        path: 'tables',
        component: TablesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueRoutingModule { }
