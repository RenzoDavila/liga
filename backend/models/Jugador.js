const mongoose = require("mongoose");

const JugadorSchema = mongoose.Schema({
  dni: {
    type: String,
    required: true,
  },
  libro: {
    type: String,
    required: true,
  },
  folio: {
    type: String,
    required: true,
  },
  club_inicial: {
    type: String,
    required: true,
  },
  club_actual: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  nombres: {
    type: String,
    required: true,
  },
  fecha_nacimiento: {
    type: Date,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  ciudad_nacimiento: {
    type: String,
    required: true,
  },
  nacionalidad: {
    type: String,
    required: true,
  },
  fecha_inscripcion: {
    type: Date,
    required: true,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Jugador", JugadorSchema);
