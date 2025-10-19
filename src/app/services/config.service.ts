import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Config from '../views/settings/settings';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private apiBase: string | undefined = environment.url;

  constructor(private http: HttpClient) { }

  getConfig(): Observable<{ message: String, data: Config }> {
    return this.http.get<{ message: String, data: Config }>(`${this.apiBase}`);
  }

  applyConfig(config: Config): Observable<any> {
    return this.http.post(`${this.apiBase}`, config);
  }

  resetConfig(config: Config): Observable<Config> {
    return this.http.put<Config>(`${this.apiBase}/reset`, config);
  }
}
