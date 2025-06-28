import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserCenterComponent } from './user-center/user-center.component';
import { ConsoleComponent } from './console/console.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'AirHive - Dashboard',
  },
  {
    path: 'userCenter',
    component: UserCenterComponent,
    title: 'AirHive - User Center',
  },
  { path: 'console', component: ConsoleComponent, title: 'AirHive - Console' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
