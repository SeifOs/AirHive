import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PCardComponent } from '../p-card/p-card.component';
import { AirHiveApiService } from '../services/air-hive-api.service';
import { Printer } from '../interfaces/printer';
import { nextTick } from 'process';
import { PrintersDataService } from '../services/printers-data.service';

@Component({
  selector: 'app-dashboard',
  imports: [PCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly airHiveApiService = inject(AirHiveApiService);
  private readonly printersDataService = inject(PrintersDataService);
  printers: Printer[] = [];

  refreshPrinters() {
    this.airHiveApiService.getData('/printers').subscribe({
      next: (data) => {
        this.printers = data as Printer[];
        this.printersDataService.setPrinters(data as Printer[]);
        console.log(this.printers);
      },
      error: (error) => {
        console.error('Error refreshing printers:', error);
      },
    });
  }

  ngOnInit(): void {
    // Initial fetch of printers when the component is initialized
    this.refreshPrinters();
  }
}
