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
  Movies: any[] = [
    {
      name: 'Avengers: Endgame',
    },
    {
      name: 'Good Boys',
    },
    {
      name: 'Playmobil: The Movie',
    },
    {
      name: 'Aquarela',
    },
    {
      name: 'Aladdin',
    },
    {
      name: 'Downton Abbey',
    },
    {
      name: 'Mi pelicula mia de mi',
    },
  ];
  constructor(private _jugadorService: JugadorService, private router: Router) {
    if (this.data) {
      console.log('tenemos data', this.data);
      this.listJugadores = this.data;
      console.log('tenemos listJugadores', this.listJugadores);
    } else {
      // this.router.navigateByUrl('/jugadores-pdf');
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
    let ultimo = this.Movies.length - 1;
    if (numero === ultimo) {
      if (this.parImpar(this.Movies.length)) {
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
    var doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height;
    var newImgDel = '';
    var newImg = '';
    var elementDel = document.getElementById('carnet-delantero');
    var element = document.getElementById('carnet-trasero');

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
          // doc.addImage(newImgDel, 0, 6, 170, 45);
          doc.addImage(newImgDel, 0, 6, 170, 225);
        }, 2000);

        var y = 500;
        if (y >= pageHeight) {
          setTimeout(function () {
            doc.addPage();
          }, 3000);

          y = 0;
        }

        setTimeout(function () {
          doc.addImage(newImg, 39.6, 6, 170, 225);
        }, 3000);

        setTimeout(function () {
          doc.save('cadula.pdf');
        }, 5000);
      });
    }
  }
}
