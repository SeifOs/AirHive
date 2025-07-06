import { Component, inject, OnInit } from '@angular/core';
import { PCardComponent } from '../p-card/p-card.component';
import { AirHiveApiService } from '../services/air-hive-api.service';

@Component({
  selector: 'app-dashboard',
  imports: [PCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly airHiveApiService = inject(AirHiveApiService);

  refreshPrinters() {
    console.log('Refresh Printers');
    // Logic to refresh printers can be added here
  }

  ngOnInit(): void {
    // this.airHiveApiService
    //   .sendCommand('url here !!!', 'command here !!!')
    //   .subscribe({
    //     next: (response) => {
    //       console.log('Command sent successfully:', response);
    //     },
    //     error: (error) => {
    //       console.error('Error sending command:', error);
    //     },
    //   });
    // this.airHiveApiService.getData('url here !!!').subscribe({
    //   next: (data) => {
    //     console.log('Data received:', data);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching data:', error);
    //   },
    // });
  }
}
