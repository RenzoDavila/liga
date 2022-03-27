const mongoose = require("mongoose");

const CategoriaSchema = mongoose.Schema({
  detalle: {
    type: String,
    required: true,
  },
  fecha_desde: {
    type: Date,
    required: true,
  },
  fecha_hasta: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Categoria", CategoriaSchema);
