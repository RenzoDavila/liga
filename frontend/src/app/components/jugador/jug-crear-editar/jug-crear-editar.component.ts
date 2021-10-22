import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { ToastrService } from 'ngx-toastr';
import { JugadorService } from 'src/app/services/jugador/jugador.service';

@Component({
  selector: 'app-jug-crear-editar',
  templateUrl: './jug-crear-editar.component.html',
  styleUrls: ['./jug-crear-editar.component.scss'],
})
export class JugCrearEditarComponent implements OnInit {
  jugadorForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _jugadorService: JugadorService,
    private aRoute: ActivatedRoute
  ) {
    this.jugadorForm = this.fb.group({
      dni: ['', Validators.required],
      libro: ['', Validators.required],
      folio: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      categoria: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      ciudad_nacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      club_inicial: ['', Validators.required],
      club_actual: ['', Validators.required],
      fecha_inscripcion: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarJugador() {
    console.log('estamos en agregarJugador');
    const JUGADOR: Jugador = {
      dni: this.jugadorForm.get('dni')?.value,
      libro: this.jugadorForm.get('libro')?.value,
      folio: this.jugadorForm.get('folio')?.value,
      nombres: this.jugadorForm.get('nombres')?.value,
      apellidos: this.jugadorForm.get('apellidos')?.value,
      categoria: this.jugadorForm.get('categoria')?.value,
      fecha_nacimiento: this.jugadorForm.get('fecha_nacimiento')?.value,
      ciudad_nacimiento: this.jugadorForm.get('ciudad_nacimiento')?.value,
      nacionalidad: this.jugadorForm.get('nacionalidad')?.value,
      club_inicial: this.jugadorForm.get('club_inicial')?.value,
      club_actual: this.jugadorForm.get('club_actual')?.value,
      fecha_inscripcion: this.jugadorForm.get('fecha_inscripcion')?.value,
    };

    console.log(JUGADOR);

    if (this.id !== null) {
      console.log('editar jugador', JUGADOR);
      this._jugadorService.editJugador(this.id, JUGADOR).subscribe(
        (data) => {
          this.toastr.success(
            'EL jugador ' +
              this.jugadorForm.get('nombres')?.value +
              ' ' +
              this.jugadorForm.get('apellidos')?.value +
              ' fue actualizado correctamente!',
            'Jugador agregado!'
          );
          this.router.navigate(['/jugador']);
        },
        (error) => {
          console.log(error);
          this.jugadorForm.reset();
        }
      );
    } else {
      console.log('nuevo jugador');
      this._jugadorService.saveJugador(JUGADOR).subscribe(
        (data) => {
          this.toastr.info(
            'EL jugador ' +
              this.jugadorForm.get('nombres')?.value +
              ' ' +
              this.jugadorForm.get('apellidos')?.value +
              ' fue agregado correctamente!',
            'Jugador agregado!'
          );
          this.router.navigate(['/jugador']);
        },
        (error) => {
          console.log(error);
          this.jugadorForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Jugador';
      this._jugadorService.getJugador(this.id).subscribe(
        (data) => {
          console.log('data', data);
          this.jugadorForm.setValue({
            dni: data.dni,
            libro: data.libro,
            folio: data.folio,
            nombres: data.nombres,
            apellidos: data.apellidos,
            categoria: data.categoria,
            fecha_nacimiento: this.formatDate(data.fecha_nacimiento),
            ciudad_nacimiento: data.ciudad_nacimiento,
            nacionalidad: data.nacionalidad,
            club_inicial: data.club_inicial,
            club_actual: data.club_actual,
            fecha_inscripcion: this.formatDate(data.fecha_inscripcion),
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
