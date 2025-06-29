import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-p-card',
  imports: [RouterLink],
  templateUrl: './p-card.component.html',
  styleUrl: './p-card.component.css',
  host: { '[attr.ngSkipHydration]': 'true' },
})
export class PCardComponent {}
