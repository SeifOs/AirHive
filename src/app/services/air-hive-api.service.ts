import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AirHiveApiService {
  constructor(private httpClient: HttpClient) {}

  sendCommand(body: string, url: string) {
    return this.httpClient.post(url, { body });
  }

  getData(url: string) {
    return this.httpClient.get(url);
  }
}
