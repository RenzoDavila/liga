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
    this.obtenerJugadores();
  }

  obtenerJugadores() {
    this._jugadorService.getJugadores().subscribe(
      (data) => {
        this.listJugadores = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  seleccionado(jugador: any) {
    if (this.listJugadoresTabla.length > 9) {
      this.toastr.warning('No puede agregar más de 10 carnets por hoja!');
    } else {
      this._jugadorService.getJugador(jugador).subscribe(
        (data) => {
          this.listJugadoresTabla.push(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
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
