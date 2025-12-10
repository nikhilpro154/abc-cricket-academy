import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CricbuzzService {
  private readonly baseUrl = 'https://Cricbuzz-Official-Cricket-API.proxy-production.allthingsdev.co';

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'x-apihub-key': 'Zo3nzJBpgyhK-CLBLan5boiVuYBAx1v8GuYhrP7ClLXIlMk-BJ',
      'x-apihub-host': 'Cricbuzz-Official-Cricket-API.allthingsdev.co',
      'x-apihub-endpoint': '8ff18bd6-7f60-45a1-bf9b-4f82b3e4c6ac'
    });
  }

  constructor(private http: HttpClient) {}

  getRecentMatches(): Observable<any> {
    const url = `${this.baseUrl}/matches/recent`;
    return this.http.get(url, { headers: this.headers });
  }

  getScorecard(matchId: number | string): Observable<any> {
    const url = `${this.baseUrl}/match/${matchId}/scorecard`;
    const headers = new HttpHeaders({
      'x-apihub-key': 'Zo3nzJBpgyhK-CLBLan5boiVuYBAx1v8GuYhrP7ClLXIlMk-BJ',
      'x-apihub-host': 'Cricbuzz-Official-Cricket-API.allthingsdev.co',
      'x-apihub-endpoint': '5f260335-c228-4005-9eec-318200ca48d6'
    });
    return this.http.get(url, { headers });
  }
}
