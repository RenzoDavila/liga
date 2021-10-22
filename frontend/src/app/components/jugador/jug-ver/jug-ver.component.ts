import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador/jugador.service';

@Component({
  selector: 'app-jug-ver',
  templateUrl: './jug-ver.component.html',
  styleUrls: ['./jug-ver.component.scss'],
})
export class JugVerComponent implements OnInit {
  listJugadores: Jugador[] = [];

  constructor(
    private _jugadorService: JugadorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('Estamos en ver jugadores');
    this.obtenerJugadores();
  }

  obtenerJugadores() {
    this._jugadorService.getJugadores().subscribe(
      (data) => {
        console.log('data', data);
        this.listJugadores = data;
      },
      (error) => {
        console.log(error);
      }
    );
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