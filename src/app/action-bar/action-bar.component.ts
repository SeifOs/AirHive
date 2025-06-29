import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { QueueListComponent } from '../queue-list/queue-list.component';

@Component({
  selector: 'app-action-bar',
  imports: [RouterLink, RouterLinkActive, QueueListComponent],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.css',
  host: { '[attr.ngSkipHydration]': 'true' },
})
export class ActionBarComponent {
  showQueue = signal(false);
}
