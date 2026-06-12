import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})


export class Documentservice {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  uploadDocument(formData: FormData) {
    return this.http.post(`${this.apiUrl}/home/upload`, formData);
  }
}
