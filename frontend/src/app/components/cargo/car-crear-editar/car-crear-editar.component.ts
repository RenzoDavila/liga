import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cargo } from 'src/app/models/Cargo';
import { CargoService } from 'src/app/services/cargo/cargo.service';

@Component({
  selector: 'app-car-crear-editar',
  templateUrl: './car-crear-editar.component.html',
  styleUrls: ['./car-crear-editar.component.scss'],
})
export class CarCrearEditarComponent implements OnInit {
  cargoForm: FormGroup;
  titulo = 'Crear Cargo';
  id: string | null;
  today!: Date;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _cargoService: CargoService,
    private aRoute: ActivatedRoute
  ) {
    this.cargoForm = this.fb.group({
      detalle: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.today = new Date();
  }

  agregarCargo() {
    console.log('estamos en agregarCargo');
    const CARGO: Cargo = {
      detalle: this.cargoForm.get('detalle')?.value,
      fecha_grabacion: this.today,
    };

    console.log(CARGO);

    if (this.id !== null) {
      console.log('editar cargo', CARGO);
      this._cargoService.editCargo(this.id, CARGO).subscribe(
        (data) => {
          this.toastr.success(
            'EL cargo ' +
              this.cargoForm.get('detalle')?.value +
              ' fue actualizado correctamente!',
            'Cargo actualizado!'
          );
          this.router.navigate(['/cargo']);
        },
        (error) => {
          console.log(error);
          this.cargoForm.reset();
        }
      );
    } else {
      console.log('nuevo cargo');
      this._cargoService.saveCargo(CARGO).subscribe(
        (data) => {
          this.toastr.info(
            'EL cargo ' +
              this.cargoForm.get('detalle')?.value +
              ' fue agregado correctamente!',
            'Cargo agregado!'
          );
          this.router.navigate(['/cargo']);
        },
        (error) => {
          console.log(error);
          this.cargoForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Cargo';
      this._cargoService.getCargo(this.id).subscribe(
        (data) => {
          console.log('data', data);
          this.cargoForm.setValue({
            detalle: data.detalle,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
