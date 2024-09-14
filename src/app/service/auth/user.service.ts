import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../article/article.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/auth/users';  // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  // Méthode pour obtenir un utilisateur par ID
  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  // Méthode pour ajouter un nouvel utilisateur
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }

  // Méthode pour mettre à jour un utilisateur
  updateUser(user: User): Observable<any> {
    return this.http.put(this.apiUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<{}>('deleteUser'))
    );
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);  // Vous pouvez aussi envoyer l'erreur à un service de log
      return of(result as T);
    };
  }

}
