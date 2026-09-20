import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PujaService } from '../../core/services/puja.service';
import { AuthService } from '../../core/services/auth.service';
import { Puja } from '../../core/models/puja.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <!-- ==================== SCREEN 1: DASHBOARD ==================== -->
    <div id="screen-dashboard" class="bg-[#FFFDF9] rounded-2xl shadow-md border border-orange-100 overflow-hidden">
      <!-- Header with Sign Up & Sign In -->
      <header class="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">🪔</div>
          <div>
            <span class="font-bold text-xl text-orange-700 tracking-tight">PoojaSetu</span>
            <span class="text-[10px] block text-amber-700 font-medium tracking-wide">पूजासेतु • THE SACRED BRIDGE</span>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a routerLink="/" class="text-orange-600 font-semibold cursor-pointer">Explore Pujas</a>
          <a routerLink="/pandits" class="hover:text-orange-600 cursor-pointer">Verified Pandits</a>
          <a routerLink="/my-bookings" class="hover:text-orange-600 cursor-pointer">My Bookings</a>
          <a href="#samagri" class="hover:text-orange-600 cursor-pointer">Samagri Kits</a>
          <a href="#muhurat" class="hover:text-orange-600 cursor-pointer">Muhurat Calendar</a>
        </div>
        <div class="flex items-center gap-3">
          @if (authService.isAuthenticated()) {
            <div class="flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg text-xs">
              <span class="w-6 h-6 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-[10px]">
                {{ authService.currentUser()?.name?.charAt(0) || 'U' }}
              </span>
              <span class="font-semibold text-gray-800">{{ authService.currentUser()?.name }}</span>
              <button (click)="authService.logout()" class="text-gray-400 hover:text-red-600 font-bold ml-1 cursor-pointer">✕</button>
            </div>
          } @else {
            <button 
              (click)="authService.openLoginModal()" 
              class="px-4 py-2 text-xs font-semibold text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer">
              Sign In
            </button>
            <button 
              (click)="authService.openRegisterModal()" 
              class="px-4 py-2 text-xs font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 shadow-sm cursor-pointer">
              Sign Up
            </button>
          }
        </div>
      </header>

      <!-- Hero & Search Tab -->
      <section class="bg-gradient-to-b from-orange-50 to-transparent p-6 md:p-10 text-center">
        <h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Book Authentic Vedic Pujas at Home</h2>
        <p class="text-gray-600 text-sm max-w-xl mx-auto mb-6">Connect with certified, experienced purohits and get complete ritual samagri delivered seamlessly.</p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto bg-white p-2 rounded-xl shadow-md border border-orange-200 flex flex-col sm:flex-row gap-2">
          <div class="flex-1 flex items-center px-3 gap-2">
            <span class="text-gray-400">🔍</span>
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              (keyup.enter)="onSearch()"
              placeholder="Search by Puja (e.g. Griha Pravesh, Saptami), deity, or need..." 
              class="w-full text-sm outline-none text-gray-800 placeholder-gray-400">
          </div>
          <button 
            (click)="onSearch()" 
            class="bg-orange-600 text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-orange-700 cursor-pointer">
            Search
          </button>
        </div>

        <!-- Category Tabs -->
        <div class="flex items-center justify-center gap-2 overflow-x-auto mt-6 py-1">
          @for (cat of categories; track cat) {
            <button 
              (click)="selectCategory(cat)"
              [class]="selectedCategory === cat 
                ? 'px-3 py-1.5 text-xs font-semibold rounded-full bg-orange-600 text-white shadow-sm cursor-pointer shrink-0'
                : 'px-3 py-1.5 text-xs font-medium rounded-full bg-white text-gray-700 border border-orange-100 hover:bg-orange-50 cursor-pointer shrink-0'">
              {{ cat }}
            </button>
          }
        </div>
      </section>

      <!-- Puja Cards Grid -->
      <section class="p-6 md:p-8 max-w-5xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-lg text-gray-900">Popular Vedic Rituals</h3>
          <span (click)="selectCategory('All Pujas')" class="text-xs text-orange-600 font-semibold cursor-pointer">
            View All ({{ pujaService.pujas().length }}) →
          </span>
        </div>

        @if (pujaService.isLoading()) {
          <div class="text-center py-12">
            <div class="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p class="text-xs text-gray-500">Loading Vedic Pujas...</p>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (puja of pujaService.pujas(); track puja._id) {
              <!-- Dynamic Puja Card matching mockup -->
              <div class="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden flex flex-col justify-between">
                <div>
                  <div [class]="getEmojiBg(puja.themeColor)" class="h-36 flex items-center justify-center text-4xl">
                    {{ puja.bgEmoji || '🪔' }}
                  </div>
                  <div class="p-5">
                    <span class="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      {{ puja.badge }}
                    </span>
                    <h4 class="font-bold text-gray-900 mt-2 text-base">
                      {{ puja.title }}
                    </h4>
                    <p class="text-xs text-gray-500 mt-1 line-clamp-2">
                      {{ puja.description }}
                    </p>
                    <div class="mt-3 flex items-center gap-3 text-xs text-gray-600">
                      <span>⏱ {{ puja.duration }}</span>
                      <span>•</span>
                      <span>👥 {{ puja.panditsCount }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="p-5 pt-0">
                  <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span class="text-[10px] text-gray-400 block">Starting from</span>
                      <span class="font-bold text-gray-900 text-base">₹{{ puja.startingPrice.toLocaleString('en-IN') }}</span>
                    </div>
                    <button 
                      (click)="bookPuja(puja)" 
                      class="bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-orange-700 shadow-sm cursor-pointer">
                      Book Slot
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </section>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `],
})
export class DashboardComponent implements OnInit {
  pujaService = inject(PujaService);
  authService = inject(AuthService);
  router = inject(Router);

  searchQuery = '';
  selectedCategory = 'All Pujas';

  categories = [
    'All Pujas',
    'Griha Pravesh',
    'Festive & Saptami',
    'Havans & Yagnas',
    'Dosha Nivarana',
  ];

  ngOnInit() {
    this.fetchPujas();
  }

  fetchPujas() {
    this.pujaService.getPujas(this.selectedCategory, this.searchQuery).subscribe();
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.fetchPujas();
  }

  onSearch() {
    this.fetchPujas();
  }

  getEmojiBg(themeColor?: string): string {
    switch (themeColor) {
      case 'orange':
        return 'bg-orange-100';
      case 'yellow':
        return 'bg-amber-50';
      default:
        return 'bg-amber-100';
    }
  }

  bookPuja(puja: Puja) {
    this.pujaService.setSelectedPuja(puja);
    this.router.navigate(['/pandits'], { queryParams: { pujaId: puja._id } });
  }
}
