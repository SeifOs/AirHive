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
  consoleMessages: string[] = [];

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
    // fetch data initially
    this.refreshFiles();

    this.airHiveApiService
      .getData('/printer-page-data/' + this.ip)
      .pipe(timeout(5000))
      .subscribe({
        next: (data) => {
          this.printer.heatbed_temperature = data.heatbed_temperature;
          this.printer.hotend_temperature = data.hotend_temperature;
          this.printer.status = data.status;
          this.progress = data.Progress;
          this.elapsedTime = data.print_elapsed_time;
          const el = this.consoleScreen.nativeElement;
          for (const msg of data.raw_responses) {
            this.consoleMessages.push(`${msg}`);
            this.scrollConsoleToBottom();
          }
          this.printer.x_coordinate = data.X;
          this.printer.y_coordinate = data.Y;
          this.printer.z_coordinate = data.Z;
          this.printer.e_coordinate = data.E;
        },
        error: (err) => {
          console.log('error getting data:', err);
        },
      });

    this.subscription = interval(2000).subscribe(() => {
      this.refreshFiles();

      this.airHiveApiService
        .getData('/printer-page-data/' + this.ip)
        .pipe(timeout(5000))
        .subscribe({
          next: (data) => {
            this.printer.heatbed_temperature = data.heatbed_temperature;
            this.printer.hotend_temperature = data.hotend_temperature;
            this.printer.status = data.status;
            this.progress = data.Progress;
            this.elapsedTime = data.print_elapsed_time;
            const el = this.consoleScreen.nativeElement;
            for (const msg of data.raw_responses) {
              this.consoleMessages.push(`${msg}`);
              this.scrollConsoleToBottom();
            }
            this.printer.x_coordinate = data.X;
            this.printer.y_coordinate = data.Y;
            this.printer.z_coordinate = data.Z;
            this.printer.e_coordinate = data.E;
          },
          error: (err) => {
            console.log('error getting data:', err);
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
          this.consoleMessages.push(`command ${command} sent`);
          this.scrollConsoleToBottom();
        },
        error: (err) => {
          console.log('error sending the command: ', err);
          this.consoleMessages.push(`error sending command: ${command}`);
          this.scrollConsoleToBottom();
        },
      });
    (event.target as HTMLInputElement).value = '';
  }
  scrollConsoleToBottom() {
    setTimeout(() => {
      if (this.consoleScreen) {
        this.consoleScreen.nativeElement.scrollTop +=
          this.consoleScreen.nativeElement.scrollHeight;
      }
    });
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
  deleteFile(index: number) {
    this.airHiveApiService
      .postCommands('/delete-file/' + this.ip, {
        filename: this.files[index],
      })
      .subscribe({
        next: () => {
          console.log(
            'delete command sent, deleting file: ',
            this.files[index]
          );
        },
        error: () => {
          console.log('error deleting file: ', this.files[index]);
        },
      });
    this.refreshFiles();
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
      // Start upload immediately after file selection
      this.uploadFile(file);
    }
  }
  uploadFile(uploadFile: File) {
    this.files.push(uploadFile.name);
    this.isUploading = true;
    this.uploadStatus = null;

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('filename', uploadFile.name);

    this.airHiveApiService
      .postCommands('/upload-file/' + this.ip, formData)
      .subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.isUploading = false;
          this.uploadStatus = 'success';
          this.uploadMessage = `File uploaded successfully!`;
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
