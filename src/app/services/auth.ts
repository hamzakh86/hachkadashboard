import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  login(email: string, motDePasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, motDePasse });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  sauvegarderToken(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  estConnecte(): boolean {
    return !!this.getToken();
  }

  deconnecter(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}