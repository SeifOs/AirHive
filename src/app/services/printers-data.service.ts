import { Injectable } from '@angular/core';
import { Printer } from '../interfaces/printer';

@Injectable({
  providedIn: 'root',
})
export class PrintersDataService {
  printers: Printer[] = [];

  setPrinters(printers: Printer[]) {
    this.printers = printers;
  }

  getPrinters(): Printer[] {
    return this.printers;
  }

  getPrinter(ip: string): Printer | undefined {
    return this.printers.find((p) => p.ip === ip);
  }
}
