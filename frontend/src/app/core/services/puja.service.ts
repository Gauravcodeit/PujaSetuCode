import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Puja, PujaResponse, SinglePujaResponse } from '../models/puja.model';

@Injectable({
  providedIn: 'root',
})
export class PujaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/pujas';

  pujas = signal<Puja[]>([]);
  selectedPuja = signal<Puja | null>(null);
  isLoading = signal<boolean>(false);

  getPujas(category?: string, search?: string): Observable<PujaResponse> {
    this.isLoading.set(true);
    let params = new HttpParams();
    if (category && category !== 'All' && category !== 'All Pujas') {
      params = params.set('category', category);
    }
    if (search && search.trim() !== '') {
      params = params.set('search', search.trim());
    }

    return this.http.get<PujaResponse>(this.apiUrl, { params }).pipe(
      tap({
        next: (res) => {
          if (res.success) {
            this.pujas.set(res.data);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      })
    );
  }

  getPujaById(id: string): Observable<SinglePujaResponse> {
    this.isLoading.set(true);
    return this.http.get<SinglePujaResponse>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: (res) => {
          if (res.success) {
            this.selectedPuja.set(res.data);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      })
    );
  }

  setSelectedPuja(puja: Puja) {
    this.selectedPuja.set(puja);
  }
}
