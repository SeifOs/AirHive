import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-air-hive-card',
  imports: [CommonModule],
  templateUrl: './air-hive-card.component.html',
  styleUrl: './air-hive-card.component.css',
})
export class AirHiveCardComponent {
  isExpanded = signal(true);

  toggleExpanded() {
    this.isExpanded.update((value) => !value);
  }

  @Input() title: string = '';
}
