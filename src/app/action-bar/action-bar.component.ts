import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-action-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css',
  host: { '[attr.ngSkipHydration]': 'true' },
})
export class ActionBarComponent {}
