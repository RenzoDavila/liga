import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { JugadorService } from 'src/app/services/jugador/jugador.service';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/Jugador';

@Component({
  selector: 'app-pre-pdf',
  templateUrl: './pre-pdf.component.html',
  styleUrls: ['./pre-pdf.component.scss'],
})
export class PrePdfComponent implements OnInit {
  data = this._jugadorService.getData();
  listJugadores: Jugador[] = [];
  currentTime = new Date();
  year = this.currentTime.getFullYear();
  constructor(private _jugadorService: JugadorService, private router: Router) {
    if (this.data) {
      console.log('tenemos data', this.data);
      this.listJugadores = this.data;
      console.log('tenemos listJugadores', this.listJugadores);
    } else {
      this.router.navigateByUrl('/jugadores-pdf');
    }
  }

  ngOnInit(): void {}

  parImpar(numero: number) {
    if (numero % 2 == 0) {
      return true;
    } else {
      return false;
    }
  }

  ultimoObjeto(numero: number) {
    let ultimo = this.listJugadores.length - 1;
    if (numero === ultimo) {
      if (this.parImpar(this.listJugadores.length)) {
        return false;
      } else {
        return true;
      }
    } else {
      console.log(false);
      return false;
    }
  }

  download() {
    console.log('en descargar pdf');
    var doc = new jsPDF('p', 'mm', [297, 210]);
    var pageHeight = doc.internal.pageSize.height;
    var pageWidth = doc.internal.pageSize.width;
    var newImgDel = '';
    var newImg = '';
    var elementDel = document.getElementById('carnet-delantero');
    var element = document.getElementById('carnet-trasero');
    var fila: number = 0;

    switch (this.listJugadores.length) {
      case 1:
      case 2:
        fila = 46.7;
        break;
      case 3:
      case 4:
        fila = 93.5;
        break;
      case 5:
      case 6:
        fila = 140;
        break;
      case 7:
      case 8:
        fila = 186.5;
        break;
      case 9:
      case 10:
        fila = 233;
        break;
      case 11:
      case 12:
        fila = 280;
        break;
    }

    if (elementDel != null) {
      html2canvas(elementDel).then((canvasDel) => {
        console.log('canvasDel', canvasDel);
        newImgDel = canvasDel.toDataURL('image/png');
      });
    }

    if (element != null) {
      html2canvas(element).then((canvas) => {
        console.log('canvas', canvas);
        newImg = canvas.toDataURL('image/png');

        setTimeout(function () {
          doc.addImage(newImgDel, 19.82, 6, 170, fila);
        }, 2000);

        var y = 500;
        if (y >= pageHeight) {
          setTimeout(function () {
            doc.addPage();
          }, 3000);

          y = 0;
        }

        setTimeout(function () {
          doc.addImage(newImg, 19.82, 6, 170, fila);
        }, 3000);

        setTimeout(function () {
          doc.save('cadula.pdf');
        }, 5000);
      });
    }
  }
}
