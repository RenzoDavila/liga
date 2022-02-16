import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Jugador } from 'src/app/models/Jugador';
import { JugadorService } from 'src/app/services/jugador/jugador.service';

@Component({
  selector: 'app-jugadores-pdf',
  templateUrl: './jugadores-pdf.component.html',
  styleUrls: ['./jugadores-pdf.component.scss'],
})
export class JugadoresPdfComponent implements OnInit {
  listJugadores: Jugador[] = [];
  listJugadoresTabla: Jugador[] = [];

  constructor(
    private _jugadorService: JugadorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Estamos en ver jugadores');
    this.obtenerJugadores();
  }

  obtenerJugadores() {
    this._jugadorService.getJugadores().subscribe(
      (data) => {
        console.log('ashkjasdfjahsjf', data);
        this.listJugadores = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  sleccionado(jugador: any) {
    console.log('dni', jugador);
    this._jugadorService.getJugador(jugador).subscribe(
      (data) => {
        console.log('data', data);
        this.listJugadoresTabla.push(data);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log('this.listJugadoresTabla', this.listJugadoresTabla);
  }

  quitar() {
    this.listJugadoresTabla.pop();
  }

  ver() {
    this._jugadorService.setData(this.listJugadoresTabla);
    this.router.navigateByUrl('/vizualizacion-pdf');
  }

  eliminarJugador(id: any) {
    this._jugadorService.deleteJugador(id).subscribe(
      (data) => {
        this.toastr.error('Datos borrados exitosamente', 'Jugador eliminado');
        this.obtenerJugadores();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
