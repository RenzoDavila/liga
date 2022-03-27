import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Fecha } from 'src/app/functions/fecha/fecha';

@Component({
  selector: 'app-cat-crear-editar',
  templateUrl: './cat-crear-editar.component.html',
  styleUrls: ['./cat-crear-editar.component.scss'],
})
export class CatCrearEditarComponent implements OnInit {
  categoriaForm: FormGroup;
  titulo = 'Crear Categoria';
  id: string | null;
  today!: Date;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _categoriaService: CategoriaService,
    private aRoute: ActivatedRoute
  ) {
    this.categoriaForm = this.fb.group({
      categoria: ['', Validators.required],
      fecha_desde: ['', Validators.required],
      fecha_hasta: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.today = new Date();
  }

  agregarCategoria() {
    const CATEGORIA: Categoria = {
      detalle: this.categoriaForm.get('categoria')?.value,
      fecha_desde: this.categoriaForm.get('fecha_desde')?.value,
      fecha_hasta: this.categoriaForm.get('fecha_hasta')?.value,
    };

    console.log(CATEGORIA);

    if (this.id !== null) {
      this._categoriaService.editCategoria(this.id, CATEGORIA).subscribe(
        (data) => {
          this.toastr.success(
            'El categoria ' +
              this.categoriaForm.get('categoria')?.value +
              ' fue actualizado correctamente!',
            'Categoria actualizado!'
          );
          this.router.navigate(['/categoria']);
        },
        (error) => {
          console.log(error);
          this.categoriaForm.reset();
        }
      );
    } else {
      this._categoriaService.saveCategoria(CATEGORIA).subscribe(
        (data) => {
          this.toastr.success(
            'El categoria ' +
              this.categoriaForm.get('categoria')?.value +
              ' fue agregado correctamente!',
            'Categoria agregado!'
          );
          this.router.navigate(['/categoria']);
        },
        (error) => {
          console.log(error);
          this.categoriaForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Categoria';
      this._categoriaService.getCategoria(this.id).subscribe(
        (data) => {
          this.categoriaForm.setValue({
            categoria: data.detalle,
            fecha_desde: Fecha.formatDate_yyyymmdd(data.fecha_desde),
            fecha_hasta: Fecha.formatDate_yyyymmdd(data.fecha_hasta),
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  formatDate_yyyymmdd(date: any) {
    return Fecha.formatDate_yyyymmdd(date);
  }
}
