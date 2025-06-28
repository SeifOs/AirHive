import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-center',
  imports: [NavbarComponent],
  templateUrl: './user-center.component.html',
  styleUrl: './user-center.component.css',
})
export class UserCenterComponent {}
