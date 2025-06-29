import { Component, signal } from '@angular/core';
import { PCardComponent } from '../p-card/p-card.component';
import { NewPrinterComponent } from '../new-printer/new-printer.component';

@Component({
  selector: 'app-dashboard',
  imports: [PCardComponent, NewPrinterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isAddDeviceVisible = signal(false);

  showAddDevice() {
    this.isAddDeviceVisible.set(true);
  }

  hideAddDevice() {
    this.isAddDeviceVisible.set(false);
  }
}
