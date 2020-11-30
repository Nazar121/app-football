import { Component, OnInit, Input } from '@angular/core';

// Store
import { Store, select } from '@ngrx/store';
import * as LeagueSelectors from '@core/core-store/league/league.selectors';

// Constants
import { CoreConstant } from '@core/constants/core.constant';

// Libs
import { Observable } from 'rxjs';

// Interfaces
import { LeagueInfo } from '@core/interfaces/league.interface';

export interface TableColumnsNames {
  position: string;
  team: string;
  played: string;
  gd: string;
  points: string;
  won?: string;
  drawn?: string;
  lost?: string;
  gf?: string;
  ga?: string;
  form?: string;
};

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss']
})
export class LeagueTableComponent implements OnInit {
  @Input() tableSmall: boolean = false;

  public leagueInfo$: Observable<LeagueInfo>;

  public tableColumnsNamesFiltered: TableColumnsNames;
  public tableColumnsNames: TableColumnsNames = {
    position: 'Position',
    team: 'Team',
    played: 'Played',
    won: 'Won',
    drawn: 'Drawn',
    lost: 'Lost',
    gf: 'GF',
    ga: 'GA',
    gd: 'GD',
    points: 'Points',
    form: 'Form'
  };
  public tableColumns: string[] = [];
  public tableData: any[] = [{}, {}, {}];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.leagueInfo$ = this.store.pipe(select(LeagueSelectors.selectLeagueInfo));
    this.setTableColumns();
  }

  setTableColumns() {
    if (this.tableSmall) { // Show small table
      this.tableColumnsNamesFiltered = {
        position: this.tableColumnsNames.position,
        team: this.tableColumnsNames.team,
        played: this.tableColumnsNames.played,
        gd: this.tableColumnsNames.gd,
        points: this.tableColumnsNames.points
      };
    } else { // Show full table
      this.tableColumnsNamesFiltered = { ...this.tableColumnsNames };
    }

    // Set table columns
    Object.entries(this.tableColumnsNamesFiltered).forEach(([key, value]) => this.tableColumns.push(value) );
  }

  getSplitTeamForm(teamForm: string): string[] {
    if (typeof teamForm !== 'string') { return []; }
    let res = teamForm.split('');
    return res.filter((value) => CoreConstant.TEAM_FORMS_LIST.find((formInfo) => formInfo.form.toUpperCase() === value.toUpperCase()) );
  }
}
