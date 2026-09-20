import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white border-b border-orange-100 sticky top-0 z-40 shadow-xs">
      <div class="container-max py-3.5 flex items-center justify-between">
        <!-- Logo & Tagline -->
        <a routerLink="/" class="flex items-center gap-3 text-decoration-none group cursor-pointer">
          <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
            🪔
          </div>
          <div>
            <span class="font-bold text-xl text-orange-700 tracking-tight font-vedic block leading-tight">PoojaSetu</span>
            <span class="text-[10px] block text-amber-700 font-semibold tracking-wider uppercase">पूजासेतु • THE SACRED BRIDGE</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a routerLink="/" routerLinkActive="text-orange-600 font-bold" [routerLinkActiveOptions]="{exact: true}" class="hover:text-orange-600 transition-colors">
            Explore Pujas
          </a>
          <a routerLink="/pandits" routerLinkActive="text-orange-600 font-bold" class="hover:text-orange-600 transition-colors">
            Verified Pandits
          </a>
          <a routerLink="/my-bookings" routerLinkActive="text-orange-600 font-bold" class="hover:text-orange-600 transition-colors flex items-center gap-1">
            <span>My Bookings</span>
            @if (authService.isAuthenticated()) {
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            }
          </a>
          <a href="#samagri" class="hover:text-orange-600 transition-colors">
            Samagri Kits
          </a>
          <a href="#muhurat" class="hover:text-orange-600 transition-colors">
            Muhurat Calendar
          </a>
        </nav>

        <!-- Auth Actions / Profile -->
        <div class="flex items-center gap-2.5">
          @if (authService.isAuthenticated()) {
            <div class="flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg">
              <div class="w-7 h-7 rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center">
                {{ authService.currentUser()?.name?.charAt(0) || 'U' }}
              </div>
              <div class="hidden sm:block text-left text-xs leading-none">
                <span class="font-bold text-slate-900 block truncate max-w-[100px]">{{ authService.currentUser()?.name }}</span>
                <span class="text-[9px] text-amber-700 font-semibold">{{ authService.currentUser()?.gotra ? 'Gotra: ' + authService.currentUser()?.gotra : 'Devotee' }}</span>
              </div>
              <button (click)="authService.logout()" class="text-[11px] text-slate-500 hover:text-red-600 font-semibold ml-1 cursor-pointer" title="Sign Out">
                ✕
              </button>
            </div>
          } @else {
            <button 
              (click)="authService.openLoginModal()" 
              class="px-3.5 py-1.5 text-xs font-semibold text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer">
              Sign In
            </button>
            <button 
              (click)="authService.openRegisterModal()" 
              class="px-3.5 py-1.5 text-xs font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 shadow-xs transition-colors cursor-pointer">
              Sign Up
            </button>
          }
        </div>
      </div>
    </header>
  `,
  styles: [`
    .text-decoration-none { text-decoration: none; }
    .shadow-xs { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  `],
})
export class HeaderComponent {
  authService = inject(AuthService);
}
