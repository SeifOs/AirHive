import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirHiveApiService {
  constructor(private httpClient: HttpClient) {}

  apiUrl: string = 'http://127.0.0.1:5000/api';

  postCommands(endpoint: string, body: string): Observable<any> {
    console.log(this.apiUrl + endpoint, body);

    return this.httpClient.post(this.apiUrl + endpoint, body);
  }

  getData(endpoint: string): Observable<any> {
    return this.httpClient.get(this.apiUrl + endpoint);
  }

  getData_size(endpoint: string, size: number): Observable<any> {
    const params = new HttpParams().set('size', size.toString());

    return this.httpClient.get(this.apiUrl + endpoint, { params });
  }
}
