import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AirHiveCardComponent } from '../air-hive-card/air-hive-card.component';
import { AirHiveApiService } from '../services/air-hive-api.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-printer-page',
  imports: [AirHiveCardComponent],
  templateUrl: './printer-page.component.html',
  styleUrl: './printer-page.component.css',
  host: {
    ngSkipHydration: 'true',
  },
})
export class PrinterPageComponent implements OnInit, OnDestroy {
  private readonly airHiveApiService = inject(AirHiveApiService);
  private subscription!: Subscription;
  hotendTemp: number = 0;
  heatbedTemp: number = 0;

  ngOnInit(): void {
    const printer = history.state.printer;

    this.subscription = interval(1000).subscribe(() => {
      // Fetch the latest printer data every second
      this.airHiveApiService.postCommands(
        '/api/update-responses/' + printer.ip,
        ''
      );

      // get the temperature data every second
      // this.airHiveApiService
      //   .getData('/api/temperature/' + printer.ip)
      //   .subscribe({
      //     next: (data) => {
      //       console.log('Temperature data:', data);
      //     },
      //     error: (error) => {
      //       console.error('Error fetching temperature data:', error);
      //     },
      //   });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sendCommand(event: Event): void {
    const command = (event.target as HTMLInputElement).value;
    console.log('Sending command:', command);

    this.airHiveApiService.postCommands('/send-command', command).subscribe({
      error: (error) => {
        console.error('Error sending command:', error);
      },
    });
  }
}
