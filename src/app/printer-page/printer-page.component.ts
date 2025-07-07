import { Printer } from './../interfaces/printer';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AirHiveCardComponent } from '../air-hive-card/air-hive-card.component';
import { AirHiveApiService } from '../services/air-hive-api.service';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PrintersDataService } from '../services/printers-data.service';

@Component({
  selector: 'app-printer-page',
  imports: [AirHiveCardComponent],
  templateUrl: './printer-page.component.html',
  styleUrl: './printer-page.component.css',
  host: {
    ngSkipHydration: 'true',
  },
})
export class PrinterPageComponent {
  ip: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.ip = params.get('ip') || '';
    });
  }
}
