import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-clu-ver',
  templateUrl: './clu-ver.component.html',
  styleUrls: ['./clu-ver.component.scss'],
})
export class CluVerComponent implements OnInit {
  listClubes: Club[] = [];

  constructor(
    private _clubService: ClubService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerClubes();
  }

  obtenerClubes() {
    this._clubService.getClubes().subscribe(
      (data) => {
        this.listClubes = data;
        this.listClubes.forEach((club) => {
          club.fecha_grabacion_string = this.formatDate(club.fecha_grabacion);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarClub(id: any) {
    this._clubService.deleteClub(id).subscribe(
      (data) => {
        this.toastr.error('Datos borrados exitosamente', 'Club eliminado');
        this.obtenerClubes();
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
