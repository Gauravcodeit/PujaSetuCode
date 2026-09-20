import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PujaService } from '../../core/services/puja.service';
import { PanditService } from '../../core/services/pandit.service';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { Puja } from '../../core/models/puja.model';
import { Pandit } from '../../core/models/pandit.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <!-- ==================== SCREEN 3: BOOKING FORM ==================== -->
    <div id="screen-booking" class="bg-[#FFFDF9] rounded-2xl shadow-md border border-orange-100 p-6 md:p-8">
      <div class="flex items-center justify-between pb-4 border-b border-orange-100 mb-6">
        <div>
          <span class="text-xs text-orange-600 font-semibold">Step 3 of 4</span>
          <h2 class="text-xl font-bold text-gray-900">Schedule & Devotee Details</h2>
        </div>
        <button (click)="goBackToPandits()" class="text-xs text-gray-500 hover:text-gray-800 cursor-pointer bg-transparent border-none">
          ← Change Pandit
        </button>
      </div>

      @if (errorMessage) {
        <div class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
          {{ errorMessage }}
        </div>
      }

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Date & Muhurat -->
          <div class="bg-white p-5 rounded-xl border border-orange-100 shadow-sm">
            <h3 class="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">📅 1. Select Auspicious Muhurat</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">Puja Date</label>
                <input 
                  type="date" 
                  [(ngModel)]="muhuratDate" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-orange-500">
              </div>
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">Preferred Time Slot</label>
                <select 
                  [(ngModel)]="muhuratSlot" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none focus:border-orange-500">
                  <option value="Brahma Muhurat (06:00 AM - 09:30 AM)">Brahma Muhurat (06:00 AM - 09:30 AM)</option>
                  <option value="Abhijit Muhurat (11:45 AM - 01:15 PM)">Abhijit Muhurat (11:45 AM - 01:15 PM)</option>
                  <option value="Pradosh Kaal (05:30 PM - 07:30 PM)">Pradosh Kaal (05:30 PM - 07:30 PM)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Devotee / Yajman Info -->
          <div class="bg-white p-5 rounded-xl border border-orange-100 shadow-sm">
            <h3 class="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">👤 2. Devotee (Yajman) Information</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="devoteeName" 
                  placeholder="Gaurav Sharma" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none">
              </div>
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">Gotra (Optional)</label>
                <input 
                  type="text" 
                  [(ngModel)]="devoteeGotra" 
                  placeholder="e.g. Kashyap, Bhardwaj" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none">
              </div>
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">WhatsApp Mobile Number</label>
                <input 
                  type="tel" 
                  [(ngModel)]="devoteePhone" 
                  placeholder="+91 98765 43210" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none">
              </div>
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  [(ngModel)]="devoteeEmail" 
                  placeholder="devotee@example.com" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none">
              </div>
            </div>
          </div>

          <!-- Venue Details -->
          <div class="bg-white p-5 rounded-xl border border-orange-100 shadow-sm">
            <h3 class="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">📍 3. Puja Venue Address</h3>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-medium text-gray-600 block mb-1">Flat / House No. & Building</label>
                <input 
                  type="text" 
                  [(ngModel)]="venueFlat" 
                  placeholder="Flat 402, Tower B, Patrakar Vihar" 
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none">
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-xs font-medium text-gray-600 block mb-1">City</label>
                  <input 
                    type="text" 
                    [(ngModel)]="venueCity" 
                    class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none">
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-600 block mb-1">Pincode</label>
                  <input 
                    type="text" 
                    [(ngModel)]="venuePincode" 
                    class="w-full text-xs p-2.5 border border-gray-200 rounded-lg outline-none">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Order Summary -->
        <div class="bg-white p-6 rounded-xl border border-orange-100 shadow-sm h-fit space-y-4">
          <h3 class="font-bold text-sm text-gray-900 pb-2 border-b border-gray-100">Booking Summary</h3>
          <div class="text-xs space-y-2 text-gray-600">
            <div class="flex justify-between"><span>Puja:</span><strong class="text-gray-800">{{ currentPuja?.title || 'Griha Pravesh Puja' }}</strong></div>
            <div class="flex justify-between"><span>Pandit:</span><strong class="text-gray-800">{{ currentPandit?.name || 'Pt. Rameshwar Sharma' }}</strong></div>
            <div class="flex justify-between"><span>Slot:</span><strong class="text-gray-800">{{ formattedSlot() }}</strong></div>
          </div>
          
          <div class="border-t border-gray-100 pt-3 text-xs space-y-2">
            <div class="flex justify-between text-gray-600"><span>Pandit Dakshina:</span><span>₹{{ getDakshina().toLocaleString('en-IN') }}</span></div>
            <div class="flex justify-between text-gray-600"><span>Vedic Samagri Kit (Included):</span><span>₹{{ getSamagriPrice().toLocaleString('en-IN') }}</span></div>
            <div class="flex justify-between text-gray-600"><span>Platform & Safety Fee:</span><span>₹99</span></div>
            <div class="flex justify-between font-bold text-sm text-gray-900 pt-2 border-t border-gray-100">
              <span>Total Payable:</span><span class="text-orange-700">₹{{ getTotalPayable().toLocaleString('en-IN') }}</span>
            </div>
          </div>

          <button 
            (click)="proceedToConfirm()" 
            [disabled]="isSubmitting"
            class="w-full bg-orange-600 text-white font-bold text-xs py-3 rounded-lg hover:bg-orange-700 shadow-md cursor-pointer disabled:opacity-60">
            {{ isSubmitting ? 'Reserving Sacred Muhurat...' : 'Proceed to Confirm Booking' }}
          </button>
          <p class="text-[10px] text-gray-400 text-center">🔒 100% Authentic Vedic Guarantee • Certified Pandits</p>
        </div>
      </div>
    </div>
  `,
})
export class BookingFormComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  pujaService = inject(PujaService);
  panditService = inject(PanditService);
  bookingService = inject(BookingService);
  authService = inject(AuthService);

  currentPuja: Puja | null = null;
  currentPandit: Pandit | null = null;

  muhuratDate: string = '2026-10-15';
  muhuratSlot: string = 'Brahma Muhurat (06:00 AM - 09:30 AM)';

  devoteeName: string = 'Gaurav Sharma';
  devoteeGotra: string = 'Kashyap';
  devoteePhone: string = '+91 98765 43210';
  devoteeEmail: string = 'devotee@example.com';

  venueFlat: string = 'Flat 402, Tower B, Patrakar Vihar';
  venueCity: string = 'Ghaziabad';
  venuePincode: string = '201014';

  errorMessage: string = '';
  isSubmitting: boolean = false;

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user) {
      if (user.name) this.devoteeName = user.name;
      if (user.email) this.devoteeEmail = user.email;
      if (user.phone) this.devoteePhone = user.phone;
      if (user.gotra) this.devoteeGotra = user.gotra;
    }

    this.route.queryParams.subscribe((params) => {
      const pujaId = params['pujaId'];
      const panditId = params['panditId'];

      if (pujaId) {
        this.pujaService.getPujaById(pujaId).subscribe({
          next: (res) => (this.currentPuja = res.data),
        });
      } else {
        this.pujaService.getPujas().subscribe({
          next: (res) => {
            if (res.data.length > 0) this.currentPuja = res.data[0];
          },
        });
      }

      if (panditId) {
        this.panditService.getPanditById(panditId).subscribe({
          next: (res) => (this.currentPandit = res.data),
        });
      } else {
        this.panditService.getPandits().subscribe({
          next: (res) => {
            if (res.data.length > 0) this.currentPandit = res.data[0];
          },
        });
      }
    });
  }

  getDakshina(): number {
    return this.currentPandit?.dakshina || this.currentPuja?.startingPrice || 4100;
  }

  getSamagriPrice(): number {
    return this.currentPuja?.samagriPrice || 1200;
  }

  getTotalPayable(): number {
    return this.getDakshina() + this.getSamagriPrice() + 99;
  }

  formattedSlot(): string {
    const timePart = this.muhuratSlot.includes('Brahma')
      ? '06:00 AM'
      : this.muhuratSlot.includes('Abhijit')
        ? '11:45 AM'
        : '05:30 PM';
    return `15 Oct, ${timePart}`;
  }

  goBackToPandits() {
    this.router.navigate(['/pandits'], {
      queryParams: { pujaId: this.currentPuja?._id || '' },
    });
  }

  proceedToConfirm() {
    this.errorMessage = '';

    if (!this.devoteeName || !this.devoteePhone || !this.devoteeEmail) {
      this.errorMessage = 'Please provide devotee full name, phone number, and email address.';
      return;
    }

    if (!this.venueFlat || !this.venueCity || !this.venuePincode) {
      this.errorMessage = 'Please provide complete venue address.';
      return;
    }

    if (!this.currentPuja || !this.currentPandit) {
      this.errorMessage = 'Puja or Pandit selection missing.';
      return;
    }

    this.isSubmitting = true;

    this.bookingService
      .createBooking({
        pujaId: this.currentPuja._id,
        panditId: this.currentPandit._id,
        muhuratDate: this.muhuratDate,
        muhuratSlot: this.muhuratSlot,
        devotee: {
          fullName: this.devoteeName,
          gotra: this.devoteeGotra,
          phone: this.devoteePhone,
          email: this.devoteeEmail,
        },
        venue: {
          flat: this.venueFlat,
          city: this.venueCity,
          pincode: this.venuePincode,
        },
      })
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          if (res.success && res.data) {
            this.router.navigate(['/confirmation', res.data.bookingId || res.data._id]);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage =
            err.error?.message || 'Could not confirm booking. Please try again.';
        },
      });
  }
}
