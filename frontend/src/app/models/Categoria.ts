export class Categoria {
  _id?: number;
  detalle: string;
  fecha_desde: Date;
  fecha_hasta: Date;

  constructor(detalle: string, fecha_desde: Date, fecha_hasta: Date) {
    this.detalle = detalle;
    this.fecha_desde = fecha_desde;
    this.fecha_hasta = fecha_hasta;
  }
}
