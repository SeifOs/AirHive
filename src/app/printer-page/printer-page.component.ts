import { Component } from '@angular/core';
import { AirHiveCardComponent } from '../air-hive-card/air-hive-card.component';

@Component({
  selector: 'app-printer-page',
  imports: [AirHiveCardComponent],
  templateUrl: './printer-page.component.html',
  styleUrl: './printer-page.component.css',
})
export class PrinterPageComponent {}
