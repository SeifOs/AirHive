import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  host: { '[attr.ngSkipHydration]': 'true' },
})
export class NavbarComponent {
  notificationsHidden = true;

  toggleDarkMode(): void {
    document.documentElement.classList.toggle('dark');
  }

  toggleNotifications(): void {
    this.notificationsHidden = !this.notificationsHidden;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.notificationsHidden = true;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.notificationsHidden = true;
  }
}
