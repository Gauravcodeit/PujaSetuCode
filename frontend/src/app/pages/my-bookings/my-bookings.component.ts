import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-max">
      <div class="bg-[#FFFDF9] rounded-2xl shadow-sm border border-orange-100 p-6 md:p-8 mb-12">
        
        <div class="flex items-center justify-between pb-4 border-b border-orange-100 mb-6">
          <div>
            <span class="text-xs text-orange-600 font-bold uppercase tracking-wider font-vedic">॥ यजमान सेवा ॥</span>
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 font-vedic mt-0.5">
              My Sacred Bookings
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">Track your scheduled Vedic pujas and purohit allocations</p>
          </div>
          <a routerLink="/" class="btn-vedic-secondary text-xs text-decoration-none">
            + Book Another Puja
          </a>
        </div>

        @if (bookingService.isLoading()) {
          <div class="text-center py-16">
            <div class="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p class="text-xs text-slate-500">Retrieving your sacred bookings...</p>
          </div>
        } @else if (bookingService.userBookings().length === 0) {
          <div class="text-center py-16 bg-white rounded-xl border border-orange-100 p-8">
            <span class="text-4xl block mb-2">🪔</span>
            <h4 class="font-bold text-sm text-slate-800">No bookings scheduled yet</h4>
            <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You have not booked any pujas yet. Bring divine blessings to your home with verified Vedic scholars.
            </p>
            <a routerLink="/" class="btn-vedic-primary text-xs mt-4 text-decoration-none inline-block">
              Explore Popular Vedic Pujas
            </a>
          </div>
        } @else {
          <div class="space-y-4">
            @for (b of bookingService.userBookings(); track b.bookingId) {
              <div class="bg-white p-5 rounded-xl border border-orange-100 shadow-xs hover:border-orange-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2 flex-wrap mb-1.5">
                    <span class="font-mono text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                      {{ b.bookingId }}
                    </span>
                    <span class="badge-green">
                      ● {{ b.status | uppercase }}
                    </span>
                    <span class="text-[10px] text-slate-400">
                      Booked on {{ b.createdAt ? (b.createdAt | date:'mediumDate') : 'Today' }}
                    </span>
                  </div>

                  <h3 class="font-bold text-base text-slate-900 font-vedic">
                    {{ b.pujaTitle }}
                  </h3>

                  <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2">
                    <span><strong>Pandit:</strong> {{ b.panditName }}</span>
                    <span>•</span>
                    <span><strong>Muhurat:</strong> {{ b.muhuratDate }} ({{ b.muhuratSlot }})</span>
                    <span>•</span>
                    <span><strong>Venue:</strong> {{ b.venue.city }} ({{ b.venue.pincode }})</span>
                  </div>
                </div>

                <div class="flex flex-row md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 gap-2 shrink-0">
                  <div class="text-right">
                    <span class="text-[10px] text-slate-400 block font-medium">Total Dakshina & Samagri</span>
                    <span class="text-base font-bold text-orange-700">₹{{ b.pricing.totalAmount.toLocaleString('en-IN') }}</span>
                  </div>
                  <a [routerLink]="['/confirmation', b.bookingId]" class="btn-vedic-secondary text-xs py-1.5 px-3 rounded-lg text-decoration-none">
                    View Receipt & Checklist →
                  </a>
                </div>
              </div>
            }
          </div>
        }

      </div>
    </div>
  `,
  styles: [`
    .text-decoration-none { text-decoration: none; }
  `],
})
export class MyBookingsComponent implements OnInit {
  bookingService = inject(BookingService);
  authService = inject(AuthService);

  ngOnInit() {
    const user = this.authService.currentUser();
    this.bookingService.getBookings(user?.email, user?.phone).subscribe();
  }
}
