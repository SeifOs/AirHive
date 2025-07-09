import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Printer } from '../interfaces/printer';
import { AirHiveApiService } from '../services/air-hive-api.service';
import { interval, Subscription, timeout } from 'rxjs';

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
  elapsedTime: string = '';
  printing: boolean = false;
  Printing_file: string = '';

  goToPrinter(ip: string) {
    this.router.navigate(['/printerPage', ip]);
  }

  ngOnInit(): void {
    // check status initially
    this.airHiveApiService
      .getData('/status/' + this.printer.ip)
      .pipe(timeout(2000))
      .subscribe({
        next: (data) => {
          this.printer.status = data.status;
          this.progress = data.Progress;
          this.printing = this.printer.status.toLowerCase() == 'printing';
          this.elapsedTime = data.elapsed_time;
          this.Printing_file = data.Printing_file;
        },
        error: (error) => {
          console.error('Error updating printer status:', error);
        },
      });

    this.subscription = interval(1000).subscribe(() => {
      // check status
      this.airHiveApiService
        .getData('/status/' + this.printer.ip)
        .pipe(timeout(2000))
        .subscribe({
          next: (data) => {
            this.printer.status = data.status;
            this.progress = data.Progress;
            this.printing = this.printer.status.toLowerCase() == 'printing';
            this.elapsedTime = data.elapsed_time;
            this.Printing_file = data.Printing_file;
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

  togglePause() {
    const command = this.printing ? ['M25'] : ['M24'];
    this.airHiveApiService
      .postCommands('/send-command/' + this.printer.ip, { commands: command })
      .subscribe({
        next: (res) => {
          console.log('command sent: ', res);
          this.printing = this.printer.status.toLowerCase() == 'printing';
        },
        error: (err) => {
          console.log('error sending the command: ', err);
        },
      });
  }
}
