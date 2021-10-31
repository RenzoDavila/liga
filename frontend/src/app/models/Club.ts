export class Club {
  _id?: number;
  detalle: string;
  fecha_grabacion: Date;

  constructor(detalle: string, fecha_grabacion: Date) {
    this.detalle = detalle;
    this.fecha_grabacion = fecha_grabacion;
  }
}
