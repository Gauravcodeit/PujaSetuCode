import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-white border-t border-orange-100 mt-12 py-10 text-slate-600 text-xs">
      <div class="container-max grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-2xl">🪔</span>
            <span class="font-bold text-base text-orange-700 font-vedic">PoojaSetu</span>
          </div>
          <p class="text-slate-500 leading-relaxed">
            Bridging age-old Vedic traditions with certified Purohits and doorstep delivery of authentic puja samagri.
          </p>
          <p class="mt-3 text-[11px] font-semibold text-amber-800">॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</p>
        </div>

        <div>
          <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Sacred Rituals</h4>
          <ul class="space-y-2 list-none p-0 m-0">
            <li><a href="#" class="hover:text-orange-600 transition-colors text-decoration-none text-slate-600">Griha Pravesh Vastu Puja</a></li>
            <li><a href="#" class="hover:text-orange-600 transition-colors text-decoration-none text-slate-600">Durga Saptashati Chandi Path</a></li>
            <li><a href="#" class="hover:text-orange-600 transition-colors text-decoration-none text-slate-600">Shri Satyanarayan Katha</a></li>
            <li><a href="#" class="hover:text-orange-600 transition-colors text-decoration-none text-slate-600">Mahamrityunjaya Jaap</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Verified Purohits</h4>
          <ul class="space-y-2 list-none p-0 m-0">
            <li><a href="#" class="hover:text-orange-600 transition-colors text-decoration-none text-slate-600">Varanasi Gurukul Scholars</a></li>
            <li><a href="#" class="hover:text-orange-600 transition-colors text-decoration-none text-slate-600">Sampurnanand Acharyas</a></li>
            <li><a href="#" class="hover:text-orange-600 transition-colors text-decoration-none text-slate-600">Nabadwip Scholar Lineage</a></li>
            <li><a href="#" class="hover:text-orange-600 transition-colors text-decoration-none text-slate-600">Kundali & Muhurat Verification</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Vedic Support</h4>
          <p class="text-slate-500 mb-2">Need guidance choosing auspicious muhurat or ritual vidhi?</p>
          <div class="bg-orange-50 border border-orange-200 p-3 rounded-lg text-slate-700">
            <span class="block font-bold text-orange-800">Helpline: +91 98765-XXXXX</span>
            <span class="text-[10px] text-amber-700">Available 06:00 AM – 09:00 PM IST</span>
          </div>
        </div>
      </div>

      <div class="container-max mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <div>© 2026 PoojaSetu. All rights reserved. 100% Authentic Vedic Guarantee.</div>
        <div class="flex gap-4">
          <a href="#" class="hover:text-slate-600 text-decoration-none text-slate-400">Privacy Policy</a>
          <a href="#" class="hover:text-slate-600 text-decoration-none text-slate-400">Terms of Rituals</a>
          <a href="#" class="hover:text-slate-600 text-decoration-none text-slate-400">Samagri Standard</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .text-decoration-none { text-decoration: none; }
  `],
})
export class FooterComponent {}
