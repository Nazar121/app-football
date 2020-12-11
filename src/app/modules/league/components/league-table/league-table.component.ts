import { Component, OnInit, Input } from '@angular/core';

// Redux
import { Store, select } from '@ngrx/store';
import * as LeagueActions from '@core/core-store/league/league.actions';
import * as LeagueSelectors from '@core/core-store/league/league.selectors';

// Constants
import { CoreConstant } from '@core/constants/core.constant';

// Libs
import { Observable } from 'rxjs';

// Interfaces
import { LeagueInfo } from '@core/interfaces/league.interface';

export interface TableColumnsNames {
  position: string | number;
  team: string | any;
  played: string | number;
  gd: string | number;
  points: string | number;
  won?: string | number;
  drawn?: string | number;
  lost?: string | number;
  gf?: string | number;
  ga?: string | number;
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
  public leagueTable: any[] = [];

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
  public tableData: TableColumnsNames[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.leagueInfo$ = this.store.pipe(select(LeagueSelectors.selectLeagueInfo));

    this.store.dispatch(LeagueActions.fetchLeagueTable({payload: {season: 2020, league: 39}}));
    this.store.pipe(select(LeagueSelectors.selectLeagueTable)).subscribe(res => {
      this.leagueTable = res.data;
      this.setTableColumns();
      this.setTableData();
    });
  }

  setTableColumns() {
    let tableColumnsNamesFiltered: TableColumnsNames;
    if (this.tableSmall) { // Show small table
      tableColumnsNamesFiltered = {
        position: this.tableColumnsNames.position,
        team: this.tableColumnsNames.team,
        played: this.tableColumnsNames.played,
        gd: this.tableColumnsNames.gd,
        points: this.tableColumnsNames.points
      };
    } else { // Show full table
      tableColumnsNamesFiltered = { ...this.tableColumnsNames };
    }

    // Set table columns
    this.tableColumns = [];
    Object.entries(tableColumnsNamesFiltered).forEach(([key, value]) => this.tableColumns.push(value) );
  }

  setTableData() {
    if (!this.leagueTable || !this.leagueTable.length) { return false; }

    let propertyName = 'all'; // all | home | away
    this.tableData = this.leagueTable.map(item => {
      let tableItem = {...this.tableColumnsNames};
      tableItem.position = item['rank'];
      tableItem.team = item['team'];
      tableItem.played = item[propertyName].played;
      tableItem.won = item[propertyName].win;
      tableItem.drawn = item[propertyName].draw;
      tableItem.lost = item[propertyName].lose;
      tableItem.gf = item[propertyName].goals.for;
      tableItem.ga = item[propertyName].goals.against;
      tableItem.gd = (+tableItem.gf) - (+tableItem.ga);
      tableItem.points = item['points'];
      tableItem.form = item['form'];

      return tableItem;
    });
  }

  getSplitTeamForm(teamForm: string): string[] {
    if (typeof teamForm !== 'string') { return []; }
    let res = teamForm.split('');
    return res.filter((value) => CoreConstant.TEAM_FORMS_LIST.find((formInfo) => formInfo.form.toUpperCase() === value.toUpperCase()) );
  }
}
