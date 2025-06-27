import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PCardComponent } from '../p-card/p-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, PCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
