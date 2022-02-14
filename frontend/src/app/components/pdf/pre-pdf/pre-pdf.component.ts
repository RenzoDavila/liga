import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pre-pdf',
  templateUrl: './pre-pdf.component.html',
  styleUrls: ['./pre-pdf.component.scss'],
})
export class PrePdfComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  download() {
    var element = document.getElementById('id');
    if (element != null) {
      html2canvas(element).then((canvas) => {
        console.log('canvas', canvas);
        var newImg = canvas.toDataURL('image/png');
        var newImg2 = canvas.toDataURL('image/png');

        var doc = new jsPDF();
        var pageHeight = doc.internal.pageSize.height;

        doc.addImage(newImg, 0, 0, 400, 500);
        // Before adding new content
        var y = 500; // Height position of new content
        if (y >= pageHeight) {
          doc.addPage();
          y = 0; // Restart height position
        }

        doc.addImage(newImg, 0, 0, 400, 500);

        doc.save('probando.pdf');
      });
    }
  }
}
