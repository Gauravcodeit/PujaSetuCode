import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, AuthResponse, LoginPayload, RegisterPayload } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/auth';

  // Signals for reactive state
  currentUser = signal<User | null>(null);
  token = signal<string | null>(null);

  isAuthenticated = computed(() => !!this.currentUser());

  // Modal State Signals
  isAuthModalOpen = signal<boolean>(false);
  authModalMode = signal<'login' | 'register'>('login');

  constructor() {
    this.loadInitialSession();
  }

  private loadInitialSession() {
    try {
      const savedToken = localStorage.getItem('pujasetu_token');
      const savedUser = localStorage.getItem('pujasetu_user');
      if (savedToken && savedUser) {
        this.token.set(savedToken);
        this.currentUser.set(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn('Error reading stored auth session', e);
    }
  }

  openLoginModal() {
    this.authModalMode.set('login');
    this.isAuthModalOpen.set(true);
  }

  openRegisterModal() {
    this.authModalMode.set('register');
    this.isAuthModalOpen.set(true);
  }

  closeAuthModal() {
    this.isAuthModalOpen.set(false);
  }

  login(credentials: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res.success && res.token) {
          this.setSession(res.token, res.user);
          this.closeAuthModal();
        }
      })
    );
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload).pipe(
      tap((res) => {
        if (res.success && res.token) {
          this.setSession(res.token, res.user);
          this.closeAuthModal();
        }
      })
    );
  }

  logout() {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem('pujasetu_token');
    localStorage.removeItem('pujasetu_user');
  }

  private setSession(token: string, user: User) {
    this.token.set(token);
    this.currentUser.set(user);
    localStorage.setItem('pujasetu_token', token);
    localStorage.setItem('pujasetu_user', JSON.stringify(user));
  }
}
