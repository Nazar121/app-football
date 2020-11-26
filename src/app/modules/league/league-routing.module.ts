import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { LeagueGuard } from '@core/guards/league.guard';

// Components
import { LeagueComponent } from './league.component';

const routes: Routes = [
  {
    path: 'league/:leagueName',
    component: LeagueComponent,
    canActivate: [LeagueGuard],
    children: [
      // {
      //   path: '',
      //   redirectTo: 'example-name'
      // },
      // {
      //   path: 'example-name',
      //   component: 
      // }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueRoutingModule { }
