import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Redux
import { Store, select } from '@ngrx/store';
import * as LeagueActions from '@core/core-store/league/league.actions';
import * as LeagueSelectors from '@core/core-store/league/league.selectors';

// Constants
import { CoreConstant } from '@core/constants/core.constant';

// Libs
import * as _ from 'lodash'; 

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

export interface PlayedMatchesItem {
  title: string;
  propertyName: string;
}

export interface SeasonItem {
  title: string;
  season: number;
}

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss']
})
export class LeagueTableComponent implements OnInit {
  @Input() tableSmall: boolean = false;

  public leagueInfo: LeagueInfo;
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

  public formFilter: FormGroup;
  public playedMatchesList: PlayedMatchesItem[] = [
    {
      title: 'All Matches',
      propertyName: 'all'
    },
    {
      title: 'Home',
      propertyName: 'home'
    },
    {
      title: 'Away',
      propertyName: 'away'
    }
  ];
  public seasonList: SeasonItem[] = [
    {
      title: '2020/2021',
      season: 2020
    },
    {
      title: '2019/2020',
      season: 2019
    },
    {
      title: '2018/2019',
      season: 2018
    },
    {
      title: '2017/2018',
      season: 2017
    },
    {
      title: '2016/2017',
      season: 2016
    },
    {
      title: '2015/2016',
      season: 2015
    },
  ];

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.formFilter = this.fb.group({
      playedMatches: [this.playedMatchesList[0]],
      season: [this.seasonList[0]],
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(LeagueSelectors.selectLeagueInfo)).subscribe((res: LeagueInfo) => {
      this.leagueInfo = res;
      this.store.dispatch(LeagueActions.fetchLeagueTable({payload: {season: this.formFilter.get('season').value.season, league: this.leagueInfo.id}}));
    });

    this.store.pipe(select(LeagueSelectors.selectLeagueTable)).subscribe(res => {
      this.leagueTable = res.data;
      this.setTableColumns();
      this.setTableData();
    });

    this.formFilter.get('playedMatches').valueChanges.subscribe((value: PlayedMatchesItem) => {
      this.setTableData();
    });

    this.formFilter.get('season').valueChanges.subscribe((value: SeasonItem) => {
      this.store.dispatch(LeagueActions.fetchLeagueTable({payload: {season: this.formFilter.get('season').value.season, league: this.leagueInfo.id, forceLoad: true}}));
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

    let propertyName: string = this.formFilter.get('playedMatches').value.propertyName; // all | home | away

    this.tableData = this.leagueTable.map(item => {
      let tableItem = {...this.tableColumnsNames};
      tableItem.position = +item['rank'];
      tableItem.team = item['team'];
      tableItem.played = +item[propertyName].played;
      tableItem.won = +item[propertyName].win;
      tableItem.drawn = +item[propertyName].draw;
      tableItem.lost = +item[propertyName].lose;
      tableItem.gf = +item[propertyName].goals.for;
      tableItem.ga = +item[propertyName].goals.against;
      tableItem.gd = (+tableItem.gf) - (+tableItem.ga);
      tableItem.points = (tableItem.won * 3) + (tableItem.drawn * 1);
      tableItem.form = item['form'];

      return tableItem;
    });

    if (propertyName === 'home' || propertyName === 'away') {
      this.tableData = _.orderBy(this.tableData, ['points','gd'], ['desc', 'desc']);
      this.tableData = this.tableData.map((item, index) => {
        item.position = index + 1;
        return item;
      });
    }
  }

  getSplitTeamForm(teamForm: string): string[] {
    if (typeof teamForm !== 'string') { return []; }
    let res = teamForm.split('');
    return res.filter((value) => CoreConstant.TEAM_FORMS_LIST.find((formInfo) => formInfo.form.toUpperCase() === value.toUpperCase()) );
  }

  resetFormFilter() {
    // season
    let seasonItem: SeasonItem = this.formFilter.get('season').value;
    let seasonEmit = (seasonItem && seasonItem.title !== this.seasonList[0].title);
    this.formFilter.get('season').setValue(this.seasonList[0], {emitEvent: seasonEmit});

    // playedMatches
    let playedMatchesItem: PlayedMatchesItem = this.formFilter.get('playedMatches').value;
    let playedMatchesEmit = (playedMatchesItem && playedMatchesItem.title !== this.playedMatchesList[0].title);
    this.formFilter.get('playedMatches').setValue(this.playedMatchesList[0], {emitEvent: playedMatchesEmit});
  }
}
