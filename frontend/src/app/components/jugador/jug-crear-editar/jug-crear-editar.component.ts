import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { Jugador } from 'src/app/models/Jugador';
import { Club } from 'src/app/models/Club';
import { Categoria } from 'src/app/models/Categoria';
import { ClubService } from 'src/app/services/club/club.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Fecha } from 'src/app/functions/fecha/fecha';
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
  listCategorias: Categoria[] = [];
  jugadorClubes: Club[] = [];
  jugadorClubesSend: Club[] = [];
  Jugador: Jugador[] = [];
  clubtemp: string | null | undefined;
  displayStyle = 'none';

  keywordClub = 'detalle';

  selectEvent(item: any) {
    this.clubtemp = item._id;
    // do something with selected item
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _jugadorService: JugadorService,
    private aRoute: ActivatedRoute,
    private _clubService: ClubService,
    private _categoriaService: CategoriaService
  ) {
    this.jugadorForm = this.fb.group({
      cedula: ['', Validators.required],
      dni: ['', Validators.required],
      libro: ['', Validators.required],
      folio: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: [],
      categoria: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      ciudad_nacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      club: [],
      club_actual: ['', Validators.required],
      fecha_inscripcion: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.obtenerClubes();
    this.obtenerCategorias();
    this.getCLubes();
    let dateTime = new Date();
    console.log(dateTime.toISOString());

    this.jugadorForm.setValue({
      cedula: '',
      dni: '',
      libro: '',
      folio: '',
      nombres: '',
      apellidos: '',
      categoria: '',
      fecha_nacimiento: '',
      ciudad_nacimiento: '',
      nacionalidad: '',
      club: '',
      club_actual: '',
      fecha_inscripcion: Fecha.formatDate_yyyymmdd(dateTime.toISOString()),
    });
    setTimeout(() => {
      this.esEditar();
    }, 2000);
  }

  getCLubes() {
    if (this.id !== null) {
      this._jugadorService.getJugador(this.id).subscribe(
        (data) => {
          this.jugadorClubesSend = data.club;
          console.log('this.jugadorClubesSend', this.jugadorClubesSend);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  agregarJugador() {
    if (this.id == null) {
      if (this.clubtemp != null || this.clubtemp != undefined) {
        let dateTime = new Date();
        this.jugadorClubesSend.unshift({
          fecha_grabacion: dateTime.toISOString(),
          detalle: this.clubtemp,
          tipo: 'exterior',
        });
      } else {
        console.log('no selecciono ningun club');
      }
    }

    const JUGADOR: Jugador = {
      cedula: this.jugadorForm.get('cedula')?.value,
      dni: this.jugadorForm.get('dni')?.value,
      libro: this.jugadorForm.get('libro')?.value,
      folio: this.jugadorForm.get('folio')?.value,
      nombres: this.jugadorForm.get('nombres')?.value,
      apellidos: this.jugadorForm.get('apellidos')?.value,
      categoria: this.jugadorForm.get('categoria')?.value,
      fecha_nacimiento: this.jugadorForm.get('fecha_nacimiento')?.value,
      ciudad_nacimiento: this.jugadorForm.get('ciudad_nacimiento')?.value,
      nacionalidad: this.jugadorForm.get('nacionalidad')?.value,
      club: this.jugadorClubesSend,
      fecha_inscripcion: this.jugadorForm.get('fecha_inscripcion')?.value,
    };

    if (this.id !== null) {
      console.log('editar jugador', JUGADOR);
      this._jugadorService.editJugador(this.id, JUGADOR).subscribe(
        (data) => {
          this.toastr.success(
            'El jugador ' +
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
      console.log('nuevo jugador', JUGADOR);
      this._jugadorService.saveJugador(JUGADOR).subscribe(
        (data) => {
          this.toastr.success(
            'El jugador ' +
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
          let clubDetalle = data.club[0].detalle;
          this.jugadorClubes = data.club;
          this.jugadorClubes.forEach(
            (element: { detalle: string }) =>
              (element.detalle = String(
                this.listClubes.find((e) => e._id === element.detalle)?.detalle
              ))
          );

          console.log('data', data);
          this.jugadorForm.setValue({
            cedula: data.cedula,
            dni: data.dni,
            libro: data.libro,
            folio: data.folio,
            nombres: data.nombres,
            apellidos: data.apellidos,
            categoria: data.categoria,
            fecha_nacimiento: Fecha.formatDate_yyyymmdd(data.fecha_nacimiento),
            ciudad_nacimiento: data.ciudad_nacimiento,
            nacionalidad: data.nacionalidad,
            club: 0,
            club_actual: this.listClubes.find((e) => e._id === clubDetalle)
              ?.detalle,
            fecha_inscripcion: Fecha.formatDate_yyyymmdd(
              data.fecha_inscripcion
            ),
          });

          this.jugadorClubes = data.club;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  obtenerClubes() {
    this._clubService.getClubes().subscribe(
      (data) => {
        this.listClubes = data;
      },
      (error) => {
        console.log(error);
      }
    );
    return true;
  }

  obtenerCategorias() {
    this._categoriaService.getCategorias().subscribe(
      (data) => {
        this.listCategorias = data;
        console.log('this.listCate', this.listCategorias);
      },
      (error) => {
        console.log(error);
      }
    );
    return true;
  }

  changeCategoria() {
    let dateTime = new Date();
    let year = parseInt(Fecha.formatDate_yyyy(dateTime.toISOString()));
    let nacFec = this.jugadorForm.get('fecha_nacimiento')?.value;
    nacFec = parseInt(nacFec.substring(0, 4));
    this.listCategorias.forEach((cat) => {
      const min = cat.desde;
      const max = cat.hasta;
      const age = year - nacFec;
      if (age >= min && age <= max) {
        this.jugadorForm.patchValue({
          categoria: cat.detalle,
        });
      }
    });
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
