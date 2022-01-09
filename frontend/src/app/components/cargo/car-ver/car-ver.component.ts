import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cargo } from 'src/app/models/Cargo';
import { CargoService } from 'src/app/services/cargo/cargo.service';

@Component({
  selector: 'app-car-ver',
  templateUrl: './car-ver.component.html',
  styleUrls: ['./car-ver.component.scss'],
})
export class CarVerComponent implements OnInit {
  listCargos: Cargo[] = [];

  constructor(
    private _cargoService: CargoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('Estamos en ver cargos');
    this.obtenerCargos();
  }

  obtenerCargos() {
    this._cargoService.getCargos().subscribe(
      (data) => {
        console.log('data', data);
        this.listCargos = data;
        this.listCargos.forEach((cargo) => {
          cargo.fecha_grabacion_string = this.formatDate(cargo.fecha_grabacion);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarCargo(id: any) {
    this._cargoService.deleteCargo(id).subscribe(
      (data) => {
        this.toastr.error('Datos borrados exitosamente', 'Cargo eliminado');
        this.obtenerCargos();
      },
      (error) => {
        console.log(error);
      }
    );
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
