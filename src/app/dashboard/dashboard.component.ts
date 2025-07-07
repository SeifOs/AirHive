import { interval, Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PCardComponent } from '../p-card/p-card.component';
import { AirHiveApiService } from '../services/air-hive-api.service';
import { Printer } from '../interfaces/printer';
import { nextTick } from 'process';

@Component({
  selector: 'app-dashboard',
  imports: [PCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly airHiveApiService = inject(AirHiveApiService);
  private subscription!: Subscription;
  printers: Printer[] = [];
  progress: number[] = [];

  refreshPrinters() {
    this.airHiveApiService.getData('/printers').subscribe({
      next: (data) => {
        this.printers = data as Printer[];
        console.log('Printers refreshed:', this.printers);
      },
      error: (error) => {
        console.error('Error refreshing printers:', error);
      },
    });
  }

  ngOnInit(): void {
    // Initial fetch of printers when the component is initialized
    this.refreshPrinters();

    this.subscription = interval(1000).subscribe(() => {
      this.updateProgress();
    });
  }

  updateProgress() {
    for (let index = 0; index < this.printers.length; index++) {
      this.airHiveApiService
        .getData('/print-progress/' + this.printers[index].ip)
        .subscribe({
          next: (data) => {
            this.progress[index] = data.Progress;
          },
          error: (error) => {
            console.error('Error refreshing printers:', error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
