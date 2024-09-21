import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Amitie, User } from '../article/article.model';

const BASIC_URL = 'http://localhost:8080/amites';

@Injectable({
  providedIn: 'root'
})

export class AmitieService {

  // private createHttpParams(params: { [key: string]: any }): HttpParams {
  //   let httpParams = new HttpParams();
  //   for (const key in params) {
  //     if (params[key] !== undefined) {
  //       httpParams = httpParams.set(key, params[key].toString());
  //     }
  //   }
  //   return httpParams;
  // }

  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // private handleError(error: any): Observable<never> {
  //   console.error('Une erreur est survenue :', error);
  //   return throwError(() => new Error(error.message || 'Une erreur est survenue'));
  // }

  constructor(private http: HttpClient) { }

  getDemandes(userId: number): Observable<Amitie[]> {
    if (userId === null) {
      console.error('User ID est indéfini.');
      return throwError(() => new Error('User ID est indéfini.'));
    }
    const headers = this.createHeaders();
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<Amitie[]>(`${BASIC_URL}/deman`, { headers, params });
  }

  demandeAmitie(userId: number, amiId: number): Observable<string> {
    const headers = this.createHeaders();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('amiId', amiId.toString());
    return this.http.post<string>(`${BASIC_URL}/demandes`, null, { headers, params });
  }

  accepterAmitie(id: number): Observable<string> {
    const headers = this.createHeaders();
    const params = new HttpParams().set('id', id.toString());
    return this.http.post<string>(`${BASIC_URL}/accepter`, null, { headers, params });
  }

  rejecterAmitie(id: number): Observable<string> {
    const headers = this.createHeaders();
    const params = new HttpParams().set('id', id.toString());
    return this.http.post<string>(`${BASIC_URL}/rejecter`, null, { headers, params });
  }

  listAmis(userId: number): Observable<User[]> {
    const headers = this.createHeaders();
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<User[]>(`${BASIC_URL}/lister`, { headers, params });
  }

  blockAmie(userId: number, amiId: number): Observable<string> {
    const headers = this.createHeaders();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('amiId', amiId.toString());
    return this.http.post<string>(`${BASIC_URL}/blocker`, null, { headers, params });
  }

  unAmie(userId: number, amiId: number): Observable<string> {
    const headers = this.createHeaders();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('amiId', amiId.toString());
    return this.http.post<string>(`${BASIC_URL}/unAmie`, null, { headers, params });
  }

}
