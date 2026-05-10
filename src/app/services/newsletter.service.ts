import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = 'http://localhost:5000/api/newsletter';

  constructor(private http: HttpClient) {}

  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(this.apiUrl);
  }

  deleteSubscriber(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
