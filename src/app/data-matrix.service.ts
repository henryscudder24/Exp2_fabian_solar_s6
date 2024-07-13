import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataMatrixService {
  private apiUrl = 'http://localhost:8000/api/data-matrix/';

  constructor(private http: HttpClient) { }

  getDataMatrix(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
