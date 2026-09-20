import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  Booking,
  CreateBookingRequest,
  BookingResponse,
  BookingListResponse,
} from '../models/booking.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:5000/api/bookings';

  latestBooking = signal<Booking | null>(null);
  userBookings = signal<Booking[]>([]);
  isLoading = signal<boolean>(false);

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.token();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  createBooking(bookingData: CreateBookingRequest): Observable<BookingResponse> {
    this.isLoading.set(true);
    const headers = this.getAuthHeaders();
    return this.http.post<BookingResponse>(this.apiUrl, bookingData, { headers }).pipe(
      tap({
        next: (res) => {
          if (res.success && res.data) {
            this.latestBooking.set(res.data);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      })
    );
  }

  getBookings(email?: string, phone?: string): Observable<BookingListResponse> {
    this.isLoading.set(true);
    let params = new HttpParams();
    if (email) params = params.set('email', email);
    if (phone) params = params.set('phone', phone);
    const headers = this.getAuthHeaders();

    return this.http.get<BookingListResponse>(this.apiUrl, { params, headers }).pipe(
      tap({
        next: (res) => {
          if (res.success) {
            this.userBookings.set(res.data);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      })
    );
  }

  getBookingById(id: string): Observable<BookingResponse> {
    this.isLoading.set(true);
    const headers = this.getAuthHeaders();
    return this.http.get<BookingResponse>(`${this.apiUrl}/${id}`, { headers }).pipe(
      tap({
        next: (res) => {
          if (res.success && res.data) {
            this.latestBooking.set(res.data);
          }
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      })
    );
  }
}
