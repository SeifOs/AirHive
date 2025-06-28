import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actions?: { label: string; action: () => void }[];
}

@Component({
  selector: 'app-notification-center',
  imports: [CommonModule],
  templateUrl: './notification-center.component.html',
  styleUrl: './notification-center.component.css',
})
export class NotificationCenterComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  activeFilter: string = 'all';
  filters: string[] = ['all', 'unread', 'info', 'success', 'warning', 'error'];

  ngOnInit() {
    // Sample notifications for demonstration
    this.loadSampleNotifications();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  get filteredNotifications(): Notification[] {
    return this.getFilteredNotifications(this.activeFilter);
  }

  getFilteredNotifications(filter: string): Notification[] {
    switch (filter) {
      case 'unread':
        return this.notifications.filter((n) => !n.read);
      case 'info':
      case 'success':
      case 'warning':
      case 'error':
        return this.notifications.filter((n) => n.type === filter);
      default:
        return this.notifications;
    }
  }

  trackByNotificationId(index: number, notification: Notification): string {
    return notification.id;
  }

  getStatusColor(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-primary';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  }

  markAsRead(id: string): void {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.read = true));
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }

  clearAll(): void {
    this.notifications = [];
  }

  formatTimestamp(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return timestamp.toLocaleDateString();
  }

  // Sample data for demonstration
  private loadSampleNotifications(): void {
    this.notifications = [
      {
        id: '1',
        title: 'Print Job Completed',
        message: 'Drone frame (PR-1) has finished printing successfully.',
        type: 'success',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        read: false,
        actions: [
          { label: 'View Details', action: () => console.log('View details') },
          { label: 'Print Again', action: () => console.log('Print again') },
        ],
      },
      {
        id: '2',
        title: 'Low Material Warning',
        message:
          'Printer PR-2 is running low on filament. Consider replacing soon.',
        type: 'warning',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        read: false,
        actions: [
          {
            label: 'Order Filament',
            action: () => console.log('Order filament'),
          },
        ],
      },
      {
        id: '3',
        title: 'Printer Offline',
        message: 'PR-3 has gone offline. Check connection and power.',
        type: 'error',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: true,
      },
      {
        id: '4',
        title: 'System Update Available',
        message: 'A new firmware update is available for your printers.',
        type: 'info',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        read: true,
        actions: [
          { label: 'Update Now', action: () => console.log('Update now') },
          {
            label: 'Schedule Later',
            action: () => console.log('Schedule later'),
          },
        ],
      },
      {
        id: '5',
        title: 'Print Queue Empty',
        message: 'All printers are idle. Ready for new jobs.',
        type: 'info',
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        read: true,
      },
    ];
  }

  // Public methods for external usage
  addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    this.notifications.unshift(newNotification);
  }

  // Example usage methods
  showPrintCompleteNotification(printerName: string, jobName: string): void {
    this.addNotification({
      title: 'Print Job Completed',
      message: `${jobName} has finished printing on ${printerName}.`,
      type: 'success',
      read: false,
      actions: [
        {
          label: 'View Details',
          action: () => console.log('View print details'),
        },
        { label: 'Print Again', action: () => console.log('Reprint job') },
      ],
    });
  }

  showErrorNotification(title: string, message: string): void {
    this.addNotification({
      title,
      message,
      type: 'error',
      read: false,
    });
  }
}
