import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PanditService } from '../../core/services/pandit.service';
import { PujaService } from '../../core/services/puja.service';
import { Pandit } from '../../core/models/pandit.model';
import { Puja } from '../../core/models/puja.model';

@Component({
  selector: 'app-pandit-selection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- ==================== SCREEN 2: PANDIT SELECTION ==================== -->
    <div id="screen-pandits" class="bg-[#FFFDF9] rounded-2xl shadow-md border border-orange-100 p-6 md:p-8">
      <div class="flex items-center justify-between pb-4 border-b border-orange-100 mb-6">
        <div>
          <span class="text-xs text-orange-600 font-semibold">Step 2 of 4</span>
          <h2 class="text-xl font-bold text-gray-900">
            Select Verified Pandit for {{ currentPuja?.title || 'Griha Pravesh Puja' }}
          </h2>
        </div>
        <a routerLink="/" class="text-xs text-gray-500 hover:text-gray-800 cursor-pointer">
          ← Back to Pujas
        </a>
      </div>

      @if (panditService.isLoading()) {
        <div class="text-center py-12">
          <div class="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p class="text-xs text-gray-500">Checking verified Purohit availability...</p>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (pandit of panditService.pandits(); track pandit._id) {
            <!-- Pandit Card matching mockup -->
            <div class="bg-white rounded-xl border border-orange-100 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-start gap-4">
                  <div [class]="getAvatarClass(pandit.avatarBg)" class="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold">
                    {{ pandit.initials }}
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <h4 class="font-bold text-gray-900 text-sm">{{ pandit.name }}</h4>
                      @if (pandit.verified) {
                        <span class="text-green-600 text-xs font-bold" title="Verified">✓</span>
                      }
                    </div>
                    <p class="text-xs text-gray-500">{{ pandit.gurukul }} • {{ pandit.experienceYears }} Yrs Exp</p>
                    <div class="flex items-center gap-1 text-xs text-amber-500 mt-1 font-semibold">
                      <span>★ {{ pandit.rating }}</span>
                      <span class="text-gray-400 font-normal">({{ pandit.reviewsCount }}+ Pujas)</span>
                    </div>
                  </div>
                </div>
                <div class="mt-4 text-xs text-gray-600 space-y-1">
                  <p><strong>Tradition:</strong> {{ pandit.tradition }}</p>
                  <p><strong>Languages:</strong> {{ pandit.languages.join(', ') }}</p>
                  <p><strong>Includes:</strong> {{ pandit.includes }}</p>
                </div>
              </div>
              <div class="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-gray-400 block">Dakshina</span>
                  <span class="font-bold text-gray-900 text-base">₹{{ pandit.dakshina.toLocaleString('en-IN') }}</span>
                </div>
                <button 
                  (click)="selectPandit(pandit)"
                  class="bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-orange-700 cursor-pointer">
                  Select Pandit
                </button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    a { text-decoration: none; }
  `],
})
export class PanditSelectionComponent implements OnInit {
  panditService = inject(PanditService);
  pujaService = inject(PujaService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  pujaId: string | null = null;
  currentPuja: Puja | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.pujaId = params['pujaId'] || null;

      if (this.pujaId) {
        this.pujaService.getPujaById(this.pujaId).subscribe({
          next: (res) => (this.currentPuja = res.data),
        });
        this.panditService.getPandits(this.pujaId).subscribe();
      } else {
        this.pujaService.getPujas().subscribe({
          next: (res) => {
            if (res.data.length > 0) this.currentPuja = res.data[0];
          },
        });
        this.panditService.getPandits().subscribe();
      }
    });
  }

  getAvatarClass(color?: string): string {
    switch (color) {
      case 'amber':
        return 'bg-amber-100 text-amber-700';
      case 'red':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  }

  selectPandit(pandit: Pandit) {
    this.panditService.setSelectedPandit(pandit);
    this.router.navigate(['/booking'], {
      queryParams: {
        pujaId: this.currentPuja?._id || this.pujaId || '',
        panditId: pandit._id,
      },
    });
  }
}
