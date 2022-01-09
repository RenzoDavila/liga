import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entrenador } from 'src/app/models/Entrenador';
import { EntrenadorService } from 'src/app/services/entrenador/entrenador.service';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-ent-crear-editar',
  templateUrl: './ent-crear-editar.component.html',
  styleUrls: ['./ent-crear-editar.component.scss'],
})
export class EntCrearEditarComponent implements OnInit {
  entrenadorForm: FormGroup;
  titulo = 'Crear Entrenador';
  id: string | null;
  slcClub: boolean = true;
  listClubes: Club[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _entrenadorService: EntrenadorService,
    private aRoute: ActivatedRoute,
    private _clubService: ClubService
  ) {
    this.entrenadorForm = this.fb.group({
      dni: ['', Validators.required],
      club: ['Seleccione un club', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.cargarSelects();
  }

  cargarSelects() {
    this.obtenerClubes();
  }

  agregarEntrenador() {
    console.log('estamos en agregarEntrenador');
    const ENTRENADOR: Entrenador = {
      dni: this.entrenadorForm.get('dni')?.value,
      club: this.entrenadorForm.get('club')?.value,
      apellidos: this.entrenadorForm.get('apellidos')?.value,
      nombres: this.entrenadorForm.get('nombres')?.value,
      nacionalidad: this.entrenadorForm.get('nacionalidad')?.value,
      telefono: this.entrenadorForm.get('telefono')?.value,
    };

    console.log(ENTRENADOR);

    if (this.id !== null) {
      console.log('editar entrenador', ENTRENADOR);
      this._entrenadorService.editEntrenador(this.id, ENTRENADOR).subscribe(
        (data) => {
          this.toastr.success(
            'EL entrenador ' +
              this.entrenadorForm.get('nombres')?.value +
              ' ' +
              this.entrenadorForm.get('apellidos')?.value +
              ' fue actualizado correctamente!',
            'Entrenador actualizado!'
          );
          this.router.navigate(['/entrenador']);
        },
        (error) => {
          console.log(error);
          this.entrenadorForm.reset();
        }
      );
    } else {
      console.log('nuevo entrenador');
      this._entrenadorService.saveEntrenador(ENTRENADOR).subscribe(
        (data) => {
          this.toastr.info(
            'EL entrenador ' +
              this.entrenadorForm.get('nombres')?.value +
              ' ' +
              this.entrenadorForm.get('apellidos')?.value +
              ' fue agregado correctamente!',
            'Entrenador agregado!'
          );
          this.router.navigate(['/entrenador']);
        },
        (error) => {
          console.log(error);
          this.entrenadorForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Entrenador';
      this._entrenadorService.getEntrenador(this.id).subscribe(
        (data) => {
          console.log('data', data);
          this.entrenadorForm.setValue({
            dni: data.dni,
            club: data.club,
            nombres: data.nombres,
            apellidos: data.apellidos,
            telefono: data.telefono,
            nacionalidad: data.nacionalidad,
          });

          this.slcClub = false;
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
        console.log('data', data);
        this.listClubes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  slcClubChange() {
    let val = this.entrenadorForm.get('club')?.value;
    if (val != '') {
      this.slcClub = false;
    }
  }
}
