import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Pandit, PanditResponse, SinglePanditResponse } from '../models/pandit.model';

@Injectable({
  providedIn: 'root',
})
export class PanditService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/pandits';

  pandits = signal<Pandit[]>([]);
  selectedPandit = signal<Pandit | null>(null);
  isLoading = signal<boolean>(false);

  getPandits(pujaId?: string, tradition?: string): Observable<PanditResponse> {
    this.isLoading.set(true);
    let params = new HttpParams();
    if (pujaId) {
      params = params.set('pujaId', pujaId);
    }
    if (tradition) {
      params = params.set('tradition', tradition);
    }

    return this.http.get<PanditResponse>(this.apiUrl, { params }).pipe(
      tap({
        next: (res) => {
          if (res.success) {
            this.pandits.set(res.data);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      })
    );
  }

  getPanditById(id: string): Observable<SinglePanditResponse> {
    this.isLoading.set(true);
    return this.http.get<SinglePanditResponse>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: (res) => {
          if (res.success) {
            this.selectedPandit.set(res.data);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      })
    );
  }

  setSelectedPandit(pandit: Pandit) {
    this.selectedPandit.set(pandit);
  }
}
