import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  toggleDarkMode(): void {
    document.documentElement.classList.toggle('dark');
  }

  toggleNotifications(notifications: HTMLElement): void {
    notifications.classList.toggle('invisible');
  }
}
