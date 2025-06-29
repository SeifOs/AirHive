import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ActionBarComponent } from './action-bar/action-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ActionBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AirHive';
}
