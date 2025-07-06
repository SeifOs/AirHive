import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirHiveApiService {
  constructor(private httpClient: HttpClient) {}

  sendCommand(url: string, body: string): Observable<any> {
    return this.httpClient.post(url, { body });
  }

  getData(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  getData_size(url: string, size: number): Observable<any> {
    const params = new HttpParams().set('size', size.toString());

    return this.httpClient.get(url, { params });
  }
}
