import { Component, inject, OnInit, signal } from '@angular/core';
import { PCardComponent } from '../p-card/p-card.component';
import { NewPrinterComponent } from '../new-printer/new-printer.component';
import { AirHiveApiService } from '../services/air-hive-api.service';

@Component({
  selector: 'app-dashboard',
  imports: [PCardComponent, NewPrinterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // private readonly airHiveApiService = inject(AirHiveApiService);

  isAddDeviceVisible = signal(false);

  showAddDevice() {
    this.isAddDeviceVisible.set(true);
  }

  hideAddDevice() {
    this.isAddDeviceVisible.set(false);
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
