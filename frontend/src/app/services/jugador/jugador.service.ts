import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jugador } from 'src/app/models/Jugador';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  url = 'http://localhost:4000/api/jugadores/';
  constructor(private http: HttpClient, private router: Router) {}
  private data: any;

  setData(data: any) {
    this.data = data;
  }

  getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }

  getJugadores(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteJugador(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  saveJugador(jugador: Jugador): Observable<any> {
    return this.http.post(this.url, jugador);
  }

  getJugador(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editJugador(id: string, jugador: Jugador): Observable<any> {
    return this.http.put(this.url + id, jugador);
  }
}
