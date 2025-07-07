import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Printer } from '../interfaces/printer';
import { AirHiveApiService } from '../services/air-hive-api.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-p-card',
  imports: [],
  templateUrl: './p-card.component.html',
  styleUrl: './p-card.component.css',
  host: { '[attr.ngSkipHydration]': 'true' },
})
export class PCardComponent implements OnInit {
  private router = inject(Router);
  @Input() printer!: Printer;
  private readonly airHiveApiService = inject(AirHiveApiService);
  private subscription!: Subscription;
  progress: number = 0;

  goToPrinter(ip: string) {
    this.router.navigate(['/printerPage', ip]);
  }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => {
      // check status
      this.airHiveApiService.getData('/status/' + this.printer.ip).subscribe({
        next: (data) => {
          this.printer.status = data.status;
        },
        error: (error) => {
          console.error('Error updating printer status:', error);
        },
      });

      // check progress
      this.airHiveApiService
        .getData('/print-progress/' + this.printer.ip)
        .subscribe({
          next: (data) => {
            this.progress = data.Progress;
          },
          error: (error) => {
            console.error('Error updating printer status:', error);
          },
        });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
