export class Jugador {
  _id?: number;
  dni: string;
  libro: string;
  folio: string;
  club_inicial: string;
  club_actual: string;
  apellidos: string;
  nombres: string;
  fecha_nacimiento: Date;
  categoria: string;
  ciudad_nacimiento: string;
  nacionalidad: string;
  fecha_inscripcion: Date;

  constructor(
    dni: string,
    libro: string,
    folio: string,
    club_inicial: string,
    club_actual: string,
    apellidos: string,
    nombres: string,
    fecha_nacimiento: Date,
    categoria: string,
    ciudad_nacimiento: string,
    nacionalidad: string,
    fecha_inscripcion: Date
  ) {
    this.dni = dni;
    this.libro = libro;
    this.folio = folio;
    this.club_inicial = club_inicial;
    this.club_actual = club_actual;
    this.apellidos = apellidos;
    this.nombres = nombres;
    this.fecha_nacimiento = fecha_nacimiento;
    this.categoria = categoria;
    this.ciudad_nacimiento = ciudad_nacimiento;
    this.nacionalidad = nacionalidad;
    this.fecha_inscripcion = fecha_inscripcion;
  }
}
