import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LeagueComponent } from './league.component';

const routes: Routes = [
  {
    path: 'league/:leagueName',
    component: LeagueComponent,
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
