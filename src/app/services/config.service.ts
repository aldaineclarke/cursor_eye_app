import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Config from '../views/settings/settings';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private apiBase: string = 'http://localhost:5000/rest/config';

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Config> {
    return this.http.get<Config>(`${this.apiBase}`);
  }

  applyConfig(config: Config): Observable<any> {
    return this.http.post(`${this.apiBase}/apply`, config);
  }

  resetConfig(): Observable<Config> {
    return this.http.post<Config>(`${this.apiBase}/reset`, {});
  }
}
