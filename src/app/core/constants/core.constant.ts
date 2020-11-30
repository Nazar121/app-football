import { LeagueInfo, RouteLeagueNameList, TeamForm } from '@core/interfaces/league.interface';

export class CoreConstant {
    public static get VERSION(): string { return '0.0.1'; }
  
    public static get ROUTE_LEAGUE_NAME_LIST(): RouteLeagueNameList { return {
        englishPremierLeague: 'english-premier-league'
    }; }

    public static get LEAGUES_LIST(): LeagueInfo[] { return [
        {
            id: 39,
            routeLeagueName: this.ROUTE_LEAGUE_NAME_LIST.englishPremierLeague,
            themeClassName: `theme-${this.ROUTE_LEAGUE_NAME_LIST.englishPremierLeague}`,
            name: 'Premier League',
            country: 'England',
            logo: 'https://media.api-sports.io/football/leagues/39.png',
            smallLogo: null,
            flag: 'https://media.api-sports.io/flags/gb.svg'
        }
    ]; }

    public static get TEAM_FORMS_LIST(): TeamForm[] { return [
        {
            form: 'W',
            fullForm: 'Won',
            className: 'won'
          },
          {
            form: 'D',
            fullForm: 'Drawn',
            className: 'drawn'
          },
          {
            form: 'L',
            fullForm: 'Lost',
            className: 'lost'
          }
    ] };
}
