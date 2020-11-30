import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { LeagueGuard } from '@core/guards/league.guard';

// Components
import { LeagueComponent } from './league.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  {
    path: 'league/:leagueName',
    component: LeagueComponent,
    canActivate: [LeagueGuard],
    children: [
      {
        path: '',
        redirectTo: 'table'
      },
      {
        path: 'table',
        component: TableComponent
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
