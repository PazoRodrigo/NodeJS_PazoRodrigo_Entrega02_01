const express = require("express");
const router = require("./router");

const app = express();

app.use(express.json());
//Declaro la carpeta que será pública. -- Ej. localhost:port/index.html
app.use(express.static(process.cwd() + "/src/public")); //Funcion que me retorna la ubicacion process.cwd()

router(app);

module.exports = app;
