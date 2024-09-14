import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Article } from './article.model';
import { AuthService } from '../auth/auth.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllArticles(): Observable<Article[]> {
    
    var userId = this.authService.getUserId();

    if (userId === null) {
      return throwError(() => new Error('Utilisateur non connecté'));
    }

    var params = new HttpParams().set('userId', userId.toString());

    var token = this.getAuthToken();

    if (!token) {
      return throwError(() => new Error('Aucun token'));
    }

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer  ${token}`
    });

    return this.http.get<Article[]>(`${BASIC_URL}/api/v1/posts/all`, { params, headers }).pipe(
      catchError(this.handleError)
    );

  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    return throwError(() => new Error(error.message || 'Une erreur est survenue'));
  }

  getAll(): Observable<any> {
    const token = this.getAuthToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${BASIC_URL}/api/v1/posts`, { headers });
  }

}
