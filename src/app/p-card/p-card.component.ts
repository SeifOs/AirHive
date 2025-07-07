import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Printer } from '../interfaces/printer';
import { AirHiveApiService } from '../services/air-hive-api.service';

@Component({
  selector: 'app-p-card',
  imports: [RouterLink],
  templateUrl: './p-card.component.html',
  styleUrl: './p-card.component.css',
  host: { '[attr.ngSkipHydration]': 'true' },
})
export class PCardComponent implements OnInit {
  @Input() printer!: Printer;
  private readonly airHiveApiService = inject(AirHiveApiService);

  ngOnInit(): void {
    this.airHiveApiService.getData('/status/' + this.printer.ip).subscribe({
      next: (data) => {
        this.printer.status = data.status;
      },
      error: (error) => {
        console.error('Error updating printer status:', error);
      },
    });
  }
}
