import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  viewChild,
  ViewChild,
} from '@angular/core';
import { AirHiveCardComponent } from '../air-hive-card/air-hive-card.component';
import { ActivatedRoute } from '@angular/router';
import { Printer } from '../interfaces/printer';
import { PrintersDataService } from '../services/printers-data.service';
import { AirHiveApiService } from '../services/air-hive-api.service';
import { interval, Subscription, timeout } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-printer-page',
  imports: [AirHiveCardComponent, NgClass],
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
  xyzPrecision: number = 0.1;
  ePrecision: number = 0.1;
  printer!: Printer;
  files: string[] = [];
  progress: number = 0;
  elapsedTime: string = '';
  ip: string = '';
  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  isUploading = false;
  uploadStatus: 'success' | 'error' | null = null;
  uploadMessage = '';

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

    this.subscription = interval(5000).subscribe(() => {
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
    this.subscription = interval(5000).subscribe(() => {
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
    this.subscription = interval(5000).subscribe(() => {
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
    this.subscription = interval(5000).subscribe(() => {
      // get coordinates
      this.airHiveApiService
        .getData('/axis-coordinates/' + this.ip)
        .pipe(timeout(5000))
        .subscribe({
          next: (data) => {
            this.printer.x_coordinate = data.X;
            this.printer.y_coordinate = data.Y;
            this.printer.z_coordinate = data.Z;
            this.printer.e_coordinate = data.E;
          },
          error: (error) => {
            console.error('Error getting coordinates:', error);
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
    this.consoleScreen.nativeElement.innerHTML += `<p class="mt-2">command ${command} sent</p>`;
    this.consoleScreen.nativeElement.scrollTop =
      this.consoleScreen.nativeElement.scrollHeight;
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
  homePrinter(axies: string[]) {
    this.airHiveApiService
      .postCommands('/home/' + this.ip, {
        'axis-to-home': axies,
      })
      .subscribe({
        next: (res) => {
          console.log('welcome home', res);
        },
        error: (err) => {
          console.log('welcome home', err);
        },
      });
  }
  motorOff() {
    this.airHiveApiService
      .postCommands('/disable-motors/' + this.ip, {})
      .subscribe({
        next: (res) => {
          console.log('done: ', res);
        },
        error: (err) => {
          console.log('error: ', err);
        },
      });
  }
  update_xyzPrecision(value: number) {
    this.xyzPrecision = value;
  }
  update_ePrecision(value: number) {
    this.ePrecision = value;
  }
  moveCoordinate(newC: number[]) {
    this.airHiveApiService
      .postCommands('/move_axis/' + this.ip, {
        x_distance: newC[0] * this.xyzPrecision,
        y_distance: newC[1] * this.xyzPrecision,
        z_distance: newC[2] * this.xyzPrecision,
        e_distance: newC[3] * this.ePrecision,
      })
      .subscribe({
        next: (res) => {
          console.log('update coordinates: ', res);
        },
        error: (err) => {
          console.log('update coordinates: ', err);
        },
      });
  }
  editHeat(newType: string, event: Event) {
    const newTarget = (event.target as HTMLInputElement).value;

    this.airHiveApiService
      .postCommands('/set-temperature/' + this.ip, {
        type: newType,
        target: newTarget,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  triggerFileInput() {
    this.fileInput().nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filename = file.name;
      const filepath = event.target.value;

      // Start upload immediately after file selection
      this.uploadFile(filename, filepath);
    }
  }

  uploadFile(filename: string, filepath: string) {
    this.isUploading = true;
    this.uploadStatus = null;

    this.airHiveApiService
      .postCommands('/upload-to-sdcard/' + this.ip, {
        filename: filename,
        filepath: filepath,
      })
      .subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.isUploading = false;
          this.uploadStatus = 'success';
          this.uploadMessage = `File "${filename}" uploaded successfully!`;
          this.resetFileInput();
        },
        error: (error) => {
          console.error('Upload failed', error);
          this.isUploading = false;
          this.uploadStatus = 'error';
          this.uploadMessage = `Upload failed: ${
            error.message || 'Unknown error'
          }`;
          this.resetFileInput();
        },
      });
  }

  resetFileInput() {
    this.fileInput().nativeElement.value = '';
  }
}
