import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AirHiveCardComponent } from '../air-hive-card/air-hive-card.component';
import { ActivatedRoute } from '@angular/router';
import { Printer } from '../interfaces/printer';
import { PrintersDataService } from '../services/printers-data.service';
import { AirHiveApiService } from '../services/air-hive-api.service';
import { interval, Subscription, timeout } from 'rxjs';

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
  private readonly printersDataService = inject(PrintersDataService);
  private readonly airHiveApiService = inject(AirHiveApiService);
  private subscription!: Subscription;
  @ViewChild('el') consoleScreen!: ElementRef;
  printer!: Printer;
  files: string[] = [];
  progress: number = 0;
  elapsedTime: string = '';
  ip: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.ip = params.get('ip') || '';
      const foundPrinter = this.printersDataService.getPrinter(this.ip);
      if (!foundPrinter) {
        throw new Error(`Printer with IP ${this.ip} not found.`);
      }
      this.printer = foundPrinter;
      console.log(this.printer);
    });
  }

  ngOnInit(): void {
    this.refreshFiles();

    this.subscription = interval(3000).subscribe(() => {
      this.airHiveApiService
        .getData('/temperature/' + this.ip)
        .pipe(timeout(5000))
        .subscribe({
          next: (data) => {
            this.printer.heatbed_temperature = data.heatbed_temperature;
            this.printer.hotend_temperature = data.hotend_temperature;
          },
          error: (err) => {
            console.log('error:', err);
          },
        });
    });

    this.subscription = interval(5000).subscribe(() => {
      // check status
      this.airHiveApiService
        .getData('/status/' + this.ip)
        .pipe(timeout(5000))
        .subscribe({
          next: (data) => {
            this.printer.status = data.status;
            this.progress = data.Progress;
          },
          error: (error) => {
            console.error('Error updating printer status:', error);
          },
        });
    });

    this.subscription = interval(1000).subscribe(() => {
      // get elapsed time
      this.airHiveApiService
        .getData('/elapsed-time/' + this.ip)
        .pipe(timeout(5000))
        .subscribe({
          next: (data) => {
            this.elapsedTime = data.elapsed_time;
          },
          error: (error) => {
            console.error('Error getting elapsed time:', error);
          },
        });
    });

    this.subscription = interval(3000).subscribe(() => {
      // get elapsed time
      this.airHiveApiService
        .getData('/raw-responses/' + this.ip)
        .pipe(timeout(5000))
        .subscribe({
          next: (data) => {
            for (let index = 0; index < data.raw_responses.length; index++) {
              this.consoleScreen.nativeElement.innerHTML += `<p>${data.raw_responses[index]}</p>`;
            }
          },
          error: (error) => {
            console.error('Error getting elapsed time:', error);
          },
        });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendCommand(event: Event) {
    const command = (event.target as HTMLInputElement).value;

    this.airHiveApiService
      .postCommands('/send-command/' + this.printer.ip, { commands: [command] })
      .subscribe({
        next: (res) => {
          console.log(`command ${command} sent with no problems`);
        },
        error: (err) => {
          console.log('error sending the command: ', err);
        },
      });
    (event.target as HTMLInputElement).value = '';
    this.consoleScreen.nativeElement.innerHTML +=
      '<p class="mt-2">command sent</p>';
  }

  refreshFiles() {
    this.airHiveApiService
      .getData('/sdcard-files/' + this.ip)
      .pipe(timeout(5000))
      .subscribe({
        next: (data) => {
          this.files = data.sdcard_files;
        },
        error: (error) => {
          console.error('Error getting sd card files:', error);
        },
      });
  }
  printFile(index: number) {
    this.airHiveApiService
      .postCommands('/print-file/' + this.ip, {
        filename: this.files[index],
      })
      .subscribe({
        next: () => {
          console.log('print command sent, printing file: ', this.files[index]);
        },
        error: () => {
          console.log('error printing file: ', this.files[index]);
        },
      });
  }
}
