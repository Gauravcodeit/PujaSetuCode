import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../core/models/booking.model';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- ==================== SCREEN 4: CONFIRMATION ==================== -->
    <div id="screen-confirmation" class="bg-[#FFFDF9] rounded-2xl shadow-md border border-orange-100 p-6 md:p-12 text-center">
      <div class="w-16 h-16 rounded-full bg-orange-100 text-3xl flex items-center justify-center mx-auto mb-3">🪔</div>
      <span class="text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">॥ ॐ श्री गणेशाय नमः ॥</span>
      <h2 class="text-2xl font-extrabold text-gray-900 mt-3">Booking Confirmed & Blessed!</h2>
      <p class="text-xs text-gray-500 mt-1">Your puja slot has been reserved. Booking ID: <strong class="text-gray-800">{{ displayBooking?.bookingId || '#PS-2026-89421' }}</strong></p>

      <!-- Details Summary Card -->
      <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl border border-orange-100 shadow-sm mt-6 text-left grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <span class="text-[10px] text-gray-400 uppercase font-semibold">Puja & Muhurat</span>
          <p class="text-xs font-bold text-gray-800 mt-0.5">{{ displayBooking?.pujaTitle || 'Griha Pravesh Puja' }}</p>
          <p class="text-xs text-gray-500">{{ displayBooking?.muhuratDate || '15 Oct 2026' }} • {{ getShortSlot() }}</p>
        </div>
        <div>
          <span class="text-[10px] text-gray-400 uppercase font-semibold">Assigned Purohit</span>
          <p class="text-xs font-bold text-gray-800 mt-0.5">{{ displayBooking?.panditName || 'Pt. Rameshwar Sharma' }}</p>
          <p class="text-xs text-orange-600">📞 {{ displayBooking?.panditPhone || '+91 98765-XXXXX' }}</p>
        </div>
        <div>
          <span class="text-[10px] text-gray-400 uppercase font-semibold">Venue Address</span>
          <p class="text-xs font-bold text-gray-800 mt-0.5">{{ displayBooking?.venue?.flat || 'Patrakar Vihar, Tower B' }}</p>
          <p class="text-xs text-gray-500">{{ displayBooking?.venue?.city || 'Ghaziabad' }} - {{ displayBooking?.venue?.pincode || '201014' }}</p>
        </div>
      </div>

      <!-- Devotee Checklist -->
      <div class="max-w-2xl mx-auto bg-amber-50/60 p-4 rounded-xl border border-amber-200 mt-4 text-left text-xs text-amber-900">
        <h4 class="font-bold text-xs text-amber-950 mb-1">Puja Preparation Checklist for Home:</h4>
        <ul class="list-disc list-inside space-y-0.5 text-xs text-amber-800">
          <li>Keep 2 clean brass plates/thalis and 2 cotton asanas (mats) ready.</li>
          <li>Pandit Ji will bring the complete 42-item havan samagri kit and dry herbs.</li>
          <li>Keep fresh cow milk (250 ml) and 5 seasonal fruits ready for prasad.</li>
        </ul>
      </div>

      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <a routerLink="/" class="px-5 py-2.5 text-xs font-semibold rounded-lg bg-orange-600 text-white hover:bg-orange-700 cursor-pointer">
          Back to Dashboard
        </a>
        <button (click)="printReceipt()" class="px-5 py-2.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">
          Download Receipt
        </button>
        <a routerLink="/my-bookings" class="px-5 py-2.5 text-xs font-semibold rounded-lg bg-white border border-orange-200 text-orange-700 hover:bg-orange-50 cursor-pointer">
          View All Bookings
        </a>
      </div>
    </div>
  `,
  styles: [`
    a { text-decoration: none; }
  `],
})
export class ConfirmationComponent implements OnInit {
  route = inject(ActivatedRoute);
  bookingService = inject(BookingService);

  displayBooking: Booking | null = null;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.bookingService.getBookingById(id).subscribe({
          next: (res) => {
            if (res.data) this.displayBooking = res.data;
          },
          error: () => {
            this.fallbackToLatest();
          },
        });
      } else {
        this.fallbackToLatest();
      }
    });
  }

  private fallbackToLatest() {
    this.displayBooking = this.bookingService.latestBooking() || {
      bookingId: '#PS-2026-89421',
      pujaTitle: 'Griha Pravesh Puja',
      panditName: 'Pt. Rameshwar Sharma',
      panditPhone: '+91 98765-XXXXX',
      muhuratDate: '15 Oct 2026',
      muhuratSlot: 'Brahma Muhurat (06:00 AM - 09:30 AM)',
      devotee: {
        fullName: 'Gaurav Sharma',
        phone: '+91 98765 43210',
        email: 'devotee@example.com',
        gotra: 'Kashyap',
      },
      venue: {
        flat: 'Patrakar Vihar, Tower B',
        city: 'Ghaziabad',
        pincode: '201014',
      },
      pricing: {
        dakshina: 4100,
        samagriFee: 1200,
        platformFee: 99,
        totalAmount: 5399,
      },
      status: 'confirmed',
      puja: '',
      pandit: '',
    };
  }

  getShortSlot(): string {
    if (!this.displayBooking?.muhuratSlot) return '06:00 AM';
    if (this.displayBooking.muhuratSlot.includes('Brahma')) return '06:00 AM';
    if (this.displayBooking.muhuratSlot.includes('Abhijit')) return '11:45 AM';
    return '05:30 PM';
  }

  printReceipt() {
    window.print();
  }
}
