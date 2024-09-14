import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

const BASIC_URL = 'http://localhost:8080/api/v1/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadUserId();
  }

  register(nomComplete: string, userNom: string, email: string, password: string, configPassword: string): Observable<any> {
    const body = { nomComplete, userNom, email, password, configPassword };
    return this.http.post(`${BASIC_URL}/register`, body);
  }

  login(userNom: string, password: string): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}/login`, { userNom, password }).pipe(
      map(response => {
        if (response.token && response.id) {
          this.setUserId(response.id);
          if (this.isBrowser()) {
            localStorage.setItem('authToken', response.token);
          }
        }
        return response;
      })
    );
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadUserId(): void {
    if (this.isBrowser()) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.userIdSubject.next(parseInt(userId, 10));
      }
    }
  }

  getUserId(): number | null {
    return this.userIdSubject.value;
  }

  setUserId(id: number): void {
    if (this.isBrowser()) {
      localStorage.setItem('userId', id.toString());
      this.userIdSubject.next(id);
    }
  }
}
