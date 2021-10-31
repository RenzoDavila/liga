import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dirigente } from 'src/app/models/Dirigente';

@Injectable({
  providedIn: 'root',
})
export class DirigenteService {
  url = 'http://localhost:4000/api/dirigentes/';
  constructor(private http: HttpClient) {}

  getDirigentes(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteDirigente(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveDirigente(dirigente: Dirigente): Observable<any> {
    return this.http.post(this.url, dirigente);
  }

  getDirigente(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editDirigente(id: string, dirigente: Dirigente): Observable<any> {
    return this.http.put(this.url + id, dirigente);
  }
}
