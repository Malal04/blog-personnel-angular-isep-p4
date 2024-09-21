import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Amitie, Article, User } from './article.model';
import { AuthService } from '../auth/auth.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllArticles(): Observable<any> {
    
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

    return this.http.get(`${BASIC_URL}/articles`, { headers: headers, params: params}).pipe(
      catchError(this.handleError)
    );

  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  getAll(): Observable<any> {
    const token = this.getAuthToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${BASIC_URL}/api/v1/posts`, { headers });
  }

  createArticle(articleDto: any, userId: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${BASIC_URL}/api/v1/posts`, articleDto, {
        headers,
        params: { userId: userId.toString() }
    }).pipe(catchError(this.handleError));
  }

  getArticleById(id: number, userId: number): Observable<Article> {
    const headers = this.createHeaders();
    return this.http.get<Article>(`${BASIC_URL}/${id}`, { headers, params: { userId: userId.toString() } })
      .pipe(catchError(this.handleError));
  }

  updateArticle(id: number, articleDto: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${BASIC_URL}/update/${id}`, articleDto, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteArticle(id: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${BASIC_URL}/delete/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    return throwError(() => new Error(error.message || 'Une erreur est survenue'));
  }

}
