require("dotenv").config();
const express = require("express");
const app = express();
const { leerFrutas, guardarFrutas } = require("./src/frutasManager");
const PORT = process.env.PORT || 3000;

let BD = [];

app.use(express.json());

app.use((req, res, next) => {
  BD = leerFrutas();
  next();
});

app.get("/", (req, res) => {
   res.send(BD);
});

app.post("/", (req, res) => {
    const nuevaFruta = req.body;
    BD.push(nuevaFruta);
    guardarFrutas(BD);
    res.status(201).send("Fruta agregada!");
});

app.get("*", (req, res) => {
  res.status(404).send("Lo sentimos, la página que buscas no existe.");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
