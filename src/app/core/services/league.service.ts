import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Env
import { environment } from '@env/environment';

// Libs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private footballAPI = environment.footballAPI;

  constructor(private http: HttpClient) { }

  getLeagueTable(data: {season: string | number, league: string | number}): Observable<any> {
    let params = {
      season: data.season.toString(),
      league: data.league.toString()
    };
    return this.http.get(`${this.footballAPI.apiUrl}/standings`, {params})
      .pipe(
        map((res) => {     
          if (!res['response'] || !res['response'].length) { throw new Error('Data are not available'); }
          return (res['response'][0].league.standings && res['response'][0].league.standings.length)
            ? res['response'][0].league.standings[0]
            : [];
        })
      );
  }
}
