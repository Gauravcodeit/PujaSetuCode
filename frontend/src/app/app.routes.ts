import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PanditSelectionComponent } from './pages/pandit-selection/pandit-selection.component';
import { BookingFormComponent } from './pages/booking-form/booking-form.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'pandits', component: PanditSelectionComponent },
  { path: 'booking', component: BookingFormComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: '**', redirectTo: '' },
];
