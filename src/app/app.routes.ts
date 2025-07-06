import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserCenterComponent } from './user-center/user-center.component';
import { ConsoleComponent } from './console/console.component';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { SdCardComponent } from './sd-card/sd-card.component';
import { PrinterPageComponent } from './printer-page/printer-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupPageComponent, title: 'AirHive - Signup' },
  { path: 'login', component: LoginPageComponent, title: 'AirHive - Login' },
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
  {
    path: 'notificationCenter',
    component: NotificationCenterComponent,
    title: 'AirHive - Notifications',
  },
  { path: 'sdCard', component: SdCardComponent, title: 'AirHive - SD Card' },
  {
    path: 'printerPage',
    component: PrinterPageComponent,
    title: 'AirHive - Printer',
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
