import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Commentaire } from '../article/article.model';
import { catchError, Observable, throwError } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/articles';

@Injectable({
  providedIn: 'root'
})

export class CommentaireService {
  constructor( private http: HttpClient, private authService: AuthService) { }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private checkUserLoggedIn(): void {
    if (this.authService.getUserId() === null) {
      throw new Error('Utilisateur non connecté');
    }
  }

  addCommentaire(articleId: number, userId: number, contenu: string): Observable<Commentaire> {
    this.checkUserLoggedIn();
    this.authService.getUserId()!;
    const headers = this.createHeaders();
    return this.http.post<Commentaire>(`${BASIC_URL}/${articleId}/commentaires`, { contenu }, { 
      params: new HttpParams().set('userId', userId.toString()),
      headers 
    }).pipe(
      catchError(err => throwError(() => new Error(`Erreur lors de l'ajout du commentaire: ${err.message}`)))
    );
  }

  deleteCommentaire(articleId: number, commentaireId: number, userId: number): Observable<void> {
    this.checkUserLoggedIn();
    this.authService.getUserId()!;
    const headers = this.createHeaders();
    return this.http.delete<void>(`${BASIC_URL}/${articleId}/commentaires/${commentaireId}`, {
      params: { userId: userId.toString() },
      headers 
    }).pipe(
      catchError(err => throwError(() => new Error(`Erreur lors de la suppression du commentaire: ${err.message}`)))
    );
  }

  getCommentaires(articleId: number): Observable<Commentaire[]> {
    const headers = this.createHeaders();
    return this.http.get<Commentaire[]>(`${BASIC_URL}/${articleId}/commentaires`, { headers }).pipe(
      catchError(err => throwError(() => new Error(`Erreur lors de la récupération des commentaires: ${err.message}`)))
    );
  }

}
