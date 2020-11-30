export interface LeagueInfo {
    id: number;
    routeLeagueName: string;
    themeClassName: string;
    name: string;
    country: string;
    logo: string;
    smallLogo: string;
    flag: string;
}

export interface RouteLeagueNameList {
    englishPremierLeague: string;
}

export interface TeamForm {
    form: string;
    fullForm: string;
    className: string;
}
