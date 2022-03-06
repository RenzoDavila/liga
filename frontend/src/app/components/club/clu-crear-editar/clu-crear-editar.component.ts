import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-clu-crear-editar',
  templateUrl: './clu-crear-editar.component.html',
  styleUrls: ['./clu-crear-editar.component.scss'],
})
export class CluCrearEditarComponent implements OnInit {
  clubForm: FormGroup;
  titulo = 'Crear Club';
  id: string | null;
  today!: Date;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _clubService: ClubService,
    private aRoute: ActivatedRoute
  ) {
    this.clubForm = this.fb.group({
      club: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.today = new Date();
  }

  agregarClub() {
    const CLUB: Club = {
      detalle: this.clubForm.get('club')?.value,
      fecha_grabacion: this.today,
    };

    if (this.id !== null) {
      this._clubService.editClub(this.id, CLUB).subscribe(
        (data) => {
          this.toastr.success(
            'El club ' +
              this.clubForm.get('club')?.value +
              ' fue actualizado correctamente!',
            'Club actualizado!'
          );
          this.router.navigate(['/club']);
        },
        (error) => {
          console.log(error);
          this.clubForm.reset();
        }
      );
    } else {
      this._clubService.saveClub(CLUB).subscribe(
        (data) => {
          this.toastr.success(
            'El club ' +
              this.clubForm.get('club')?.value +
              ' fue agregado correctamente!',
            'Club agregado!'
          );
          this.router.navigate(['/club']);
        },
        (error) => {
          console.log(error);
          this.clubForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Club';
      this._clubService.getClub(this.id).subscribe(
        (data) => {
          this.clubForm.setValue({
            club: data.detalle,
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
