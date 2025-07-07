import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  host: { '[attr.ngSkipHydration]': 'true' },
})
export class NavbarComponent {
  toggleDarkMode(): void {
    document.documentElement.classList.toggle('dark');
  }
}
