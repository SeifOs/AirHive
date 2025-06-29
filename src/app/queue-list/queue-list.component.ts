import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QueueItem {
  id: string;
  name: string;
  printer: string;
  status: 'waiting' | 'printing' | 'paused' | 'error';
  progress?: number;
  timeAdded: string;
  estimatedTime?: string;
  copies: number;
}
@Component({
  selector: 'app-queue-list',
  imports: [],
  templateUrl: './queue-list.component.html',
  styleUrl: './queue-list.component.css',
})
export class QueueListComponent {
  @Input() isVisible = signal(false);
  @Output() visibilityChange = new EventEmitter<boolean>();

  // Mock data - replace with your actual service
  queueItems = signal<QueueItem[]>([
    {
      id: '1',
      name: 'drone frame.stl',
      printer: 'PR-1',
      status: 'printing',
      progress: 70,
      timeAdded: '10 min ago',
      estimatedTime: '15 min',
      copies: 2,
    },
    {
      id: '2',
      name: 'propeller.stl',
      printer: 'PR-2',
      status: 'waiting',
      timeAdded: '5 min ago',
      copies: 4,
    },
    {
      id: '3',
      name: 'battery_holder.stl',
      printer: 'PR-1',
      status: 'paused',
      timeAdded: '20 min ago',
      copies: 1,
    },
    {
      id: '4',
      name: 'landing_gear.stl',
      printer: 'PR-3',
      status: 'error',
      timeAdded: '1 hr ago',
      copies: 2,
    },
  ]);

  closeQueue() {
    this.isVisible.set(false);
    this.visibilityChange.emit(false);
  }

  getTotalJobs(): number {
    return this.queueItems().length;
  }

  getActiveJobs(): number {
    return this.queueItems().filter(
      (item) => item.status === 'printing' || item.status === 'waiting'
    ).length;
  }

  getStatusClass(status: string): string {
    const classes = {
      waiting:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      printing:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      paused: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return classes[status as keyof typeof classes] || '';
  }

  getStatusText(status: string): string {
    const statusText = {
      waiting: 'Waiting',
      printing: 'Printing',
      paused: 'Paused',
      error: 'Error',
    };
    return statusText[status as keyof typeof statusText] || status;
  }
}
