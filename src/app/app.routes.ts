import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrinterPageComponent } from './printer-page/printer-page.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'AirHive - Home' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'AirHive - Dashboard',
  },
  {
    path: 'printerPage/:ip',
    component: PrinterPageComponent,
    title: 'AirHive - Printer',
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
