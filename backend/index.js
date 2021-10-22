const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//creamos el servidor

const app = express();

//Conectamos con la DB

conectarDB();
app.use(cors());

app.use(express.json());

app.use("/api/jugadores", require("./routes/jugador"));

app.listen(4000, () => {
  console.log("Corriendo");
});
