import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { Jugador } from 'src/app/models/Jugador';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-jug-crear-editar',
  templateUrl: './jug-crear-editar.component.html',
  styleUrls: ['./jug-crear-editar.component.scss'],
})
export class JugCrearEditarComponent implements OnInit {
  jugadorForm: FormGroup;
  titulo = 'Crear Jugador';
  id: string | null;
  slcClub: boolean = true;
  cambioClub: boolean = false;
  listClubes: Club[] = [];
  clubtemp: string | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _jugadorService: JugadorService,
    private aRoute: ActivatedRoute,
    private _clubService: ClubService
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
      club: ['Seleccione un club', Validators.required],
      fecha_inscripcion: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.obtenerClubes();
  }

  agregarJugador() {
    console.log('estamos en agregarJugador');
    let iniclub = this.jugadorForm.get('club')?.value;
    if (this.id !== null) {
      iniclub = this.jugadorForm.get('club_inicial')?.value;
    }
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
      club_inicial: iniclub,
      club_actual: this.jugadorForm.get('club')?.value,
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
            'Jugador actualizado!'
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
          this.clubtemp = data.club_actual;
          console.log('clubtemp', this.clubtemp);
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
            club: data.club_actual,
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

  obtenerClubes() {
    this._clubService.getClubes().subscribe(
      (data) => {
        console.log('data clubes', data);
        this.listClubes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  slcClubChange() {
    let val = this.jugadorForm.get('club')?.value;
    if (val != '') {
      this.slcClub = false;
      if (val == this.clubtemp) {
        console.log('son iguales conserva el club inicial');
      }
    }
  }

  countryList: Array<any> = [
    {
      name: 'Germany',
      cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'],
    },
    { name: 'Spain', cities: ['Barcelona'] },
    { name: 'USA', cities: ['Downers Grove'] },
    { name: 'Mexico', cities: ['Puebla'] },
    { name: 'China', cities: ['Beijing'] },
  ];
  cities: Array<any> | undefined;
  changeCountry() {
    let count = this.jugadorForm.get('pais')?.value;
    this.cities = this.countryList.find((con) => con.name == count).cities;
  }
}
