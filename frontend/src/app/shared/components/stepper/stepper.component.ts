import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Control Header to Switch Screens & Viewports matching mockup -->
    <div class="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span class="text-2xl">🪔</span> PoojaSetu UI Mockup
        </h1>
        <p class="text-xs text-gray-500">Interactive screen preview for design review and Figma import</p>
      </div>

      <!-- Right Actions: Screens Navigation + Quick Auth Trigger -->
      <div class="flex flex-wrap items-center gap-2">
        <a routerLink="/" 
           [class]="isRouteActive('/') ? activeClass : inactiveClass">
          1. Dashboard
        </a>
        <a routerLink="/pandits" 
           [class]="isRouteActive('/pandits') ? activeClass : inactiveClass">
          2. Pandit Selection
        </a>
        <a routerLink="/booking" 
           [class]="isRouteActive('/booking') ? activeClass : inactiveClass">
          3. Booking Form
        </a>
        <a routerLink="/confirmation" 
           [class]="isRouteActive('/confirmation') ? activeClass : inactiveClass">
          4. Confirmation
        </a>

        <!-- Global Auth Button in Stepper -->
        @if (authService.isAuthenticated()) {
          <div class="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg text-xs ml-2">
            <span class="w-5 h-5 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-[9px]">
              {{ authService.currentUser()?.name?.charAt(0) || 'U' }}
            </span>
            <span class="font-semibold text-gray-800 text-[11px]">{{ authService.currentUser()?.name }}</span>
            <button (click)="authService.logout()" class="text-gray-400 hover:text-red-600 font-bold ml-1 cursor-pointer text-xs" title="Sign Out">✕</button>
          </div>
        } @else {
          <button 
            type="button"
            (click)="authService.openLoginModal()" 
            class="px-3 py-1.5 text-xs font-semibold text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer ml-1">
            Sign In
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    a { text-decoration: none; cursor: pointer; }
  `],
})
export class StepperComponent {
  private router = inject(Router);
  authService = inject(AuthService);
  currentUrl: string = '/';

  activeClass = 'px-3 py-1.5 text-xs font-semibold rounded-lg bg-orange-600 text-white';
  inactiveClass = 'px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200';

  constructor() {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.urlAfterRedirects || event.url;
      });
  }

  isRouteActive(route: string): boolean {
    if (route === '/') {
      return this.currentUrl === '/' || this.currentUrl.startsWith('/?');
    }
    return this.currentUrl.startsWith(route);
  }
}
