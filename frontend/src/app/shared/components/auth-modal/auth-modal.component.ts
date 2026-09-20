import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (authService.isAuthModalOpen()) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        (click)="onBackdropClick($event)">
        
        <div 
          class="bg-white rounded-2xl max-w-md w-full p-6 border border-orange-200 shadow-2xl relative text-left"
          (click)="$event.stopPropagation()">
          
          <!-- Close button -->
          <button 
            type="button"
            (click)="authService.closeAuthModal()"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
            ✕
          </button>

          <!-- Vedic Header -->
          <div class="text-center mb-5">
            <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl mx-auto mb-2">
              🪔
            </div>
            <span class="text-[11px] font-bold text-orange-700 uppercase tracking-widest block font-serif">
              ॥ ॐ नमः शिवाय ॥
            </span>
            <h3 class="text-lg font-bold text-gray-900 mt-1">
              {{ authService.authModalMode() === 'login' ? 'Sign In to PoojaSetu' : 'Create Devotee Account' }}
            </h3>
            <p class="text-xs text-gray-500 mt-0.5">
              {{ authService.authModalMode() === 'login' ? 'Access your booked pujas and verified purohit details' : 'Join thousands of devotees booking authentic Vedic pujas' }}
            </p>
          </div>

          <!-- Error Message Banner -->
          @if (errorMessage) {
            <div class="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>{{ errorMessage }}</span>
            </div>
          }

          <!-- Tabs -->
          <div class="flex border-b border-gray-200 mb-4">
            <button 
              type="button"
              (click)="switchMode('login')"
              [class]="authService.authModalMode() === 'login' 
                ? 'flex-1 py-2 text-xs font-bold text-orange-600 border-b-2 border-orange-600 cursor-pointer' 
                : 'flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-800 cursor-pointer'">
              Sign In
            </button>
            <button 
              type="button"
              (click)="switchMode('register')"
              [class]="authService.authModalMode() === 'register' 
                ? 'flex-1 py-2 text-xs font-bold text-orange-600 border-b-2 border-orange-600 cursor-pointer' 
                : 'flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-800 cursor-pointer'">
              New Devotee (Sign Up)
            </button>
          </div>

          <!-- Form -->
          <form (ngSubmit)="onSubmit()" class="space-y-3.5">
            @if (authService.authModalMode() === 'register') {
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">Full Name (Yajman)</label>
                <input 
                  type="text" 
                  [(ngModel)]="name" 
                  name="name" 
                  required
                  placeholder="e.g. Gaurav Sharma" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-orange-500 bg-white text-gray-800" />
              </div>
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">Gotra (Optional)</label>
                <input 
                  type="text" 
                  [(ngModel)]="gotra" 
                  name="gotra" 
                  placeholder="e.g. Kashyap, Bhardwaj, Vatsa" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-orange-500 bg-white text-gray-800" />
              </div>
            }

            <div>
              <label class="text-xs font-medium text-gray-600 block mb-1">Email Address</label>
              <input 
                type="email" 
                [(ngModel)]="email" 
                name="email" 
                required
                placeholder="devotee@example.com" 
                class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-orange-500 bg-white text-gray-800" />
            </div>

            @if (authService.authModalMode() === 'register') {
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">WhatsApp Mobile Number</label>
                <input 
                  type="tel" 
                  [(ngModel)]="phone" 
                  name="phone" 
                  placeholder="+91 98765 43210" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-orange-500 bg-white text-gray-800" />
              </div>
            }

            <div>
              <label class="text-xs font-medium text-gray-600 block mb-1">Password</label>
              <input 
                type="password" 
                [(ngModel)]="password" 
                name="password" 
                required
                placeholder="••••••••" 
                class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-orange-500 bg-white text-gray-800" />
            </div>

            <!-- Submit Button with explicit Tailwind classes -->
            <button 
              type="submit" 
              [disabled]="isSubmitting"
              class="w-full bg-orange-600 text-white font-bold text-xs py-3 rounded-lg hover:bg-orange-700 shadow-md cursor-pointer disabled:opacity-50 mt-3 transition-colors">
              @if (isSubmitting) {
                <span>Connecting with Divine...</span>
              } @else {
                <span>{{ authService.authModalMode() === 'login' ? 'Sign In to Account' : 'Complete Devotee Registration' }}</span>
              }
            </button>
          </form>

          <!-- Quick 1-Click Demo Fill -->
          <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Demo Devotee:</span>
            <button 
              type="button" 
              (click)="fillDemoCredentials()"
              class="text-orange-600 font-semibold hover:underline bg-transparent border-none cursor-pointer">
              Click to Auto-fill Credentials
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class AuthModalComponent {
  authService = inject(AuthService);

  name = '';
  email = 'gaurav@example.com';
  password = 'secretPassword123';
  phone = '+91 98765 43210';
  gotra = 'Kashyap';
  errorMessage = '';
  isSubmitting = false;

  switchMode(mode: 'login' | 'register') {
    this.authService.authModalMode.set(mode);
    this.errorMessage = '';
  }

  fillDemoCredentials() {
    this.authService.authModalMode.set('login');
    this.email = 'gaurav@example.com';
    this.password = 'secretPassword123';
  }

  onBackdropClick(event: MouseEvent) {
    this.authService.closeAuthModal();
  }

  onSubmit() {
    this.errorMessage = '';
    this.isSubmitting = true;

    if (this.authService.authModalMode() === 'login') {
      this.authService
        .login({ email: this.email, password: this.password })
        .subscribe({
          next: () => {
            this.isSubmitting = false;
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Login failed. Please verify your credentials.';
            this.isSubmitting = false;
          },
        });
    } else {
      this.authService
        .register({
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone,
          gotra: this.gotra,
        })
        .subscribe({
          next: () => {
            this.isSubmitting = false;
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Registration failed. Please check your details.';
            this.isSubmitting = false;
          },
        });
    }
  }
}
