const express = require("express");
const cursos = require("./cursos.js");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenidos al servidor web con rutas dinámicas");
});

app.get("/cursos/:categoria", (req, res) => {
  //   console.log(req.params.categoria.trim().toLowerCase()); // Imprime la categoría de cursos recibida en la URL
  let parametro = req.params.categoria.trim().toLowerCase(); // Obtiene y normaliza la categoría de cursos recibida en la URL
  if (parametro !== "") {
    let resultado = [];
    for (let curso of cursos) {
      if (curso.categoria.toLowerCase() === parametro) {
        resultado.push(curso);
      }
    }
    resultado.length > 0
      ? res.json(resultado) // Si se encontraron cursos que coinciden con la categoría, los envía como respuesta en formato JSON
      : res.json([
          { id: "Error", descripcion: "No se encontraron coincidencias." },
        ]); // Si no se encontraron cursos que coinciden con la categoría, envía un mensaje de error en formato JSON
  }
});

app.get("/cursos", (req, res) => {
  let respuesta = [];
  const queryParams = Object.keys(req.query);
  if (queryParams.length === 0) {
    console.log("No llegan parámetros. Envío el set de datos");
    res.json({ id: "Error", descripcion: "No se recibieron parametros." });
  } else {
    console.log("llegan los parámetros nombre y categoria");
    for (let curso of cursos) {
      if (
        curso.nombre.toLowerCase().includes(req.query.nombre.toLowerCase()) &&
        curso.categoria
          .toLowerCase()
          .includes(req.query.categoria.toLowerCase())
      ) {
        respuesta.push(curso);
      }
    }
  }
  res.json(respuesta);

  //otra opción:
  //   let respuesta = [];
  //   for (let curso of cursos) {
  //     if (
  //       curso.nombre.toLowerCase() === req.query.nombre.toLowerCase() &&
  //       curso.categoria.toLowerCase() === req.query.categoria.toLowerCase()
  //     ) {
  //       respuesta.push(curso);
  //     }
  //   }
  //   respuesta.length === 0 ? res.json(cursos) : res.json(respuesta);
});

app.get("/curso/codigo/:id", (req, res) => {
  const codigo = parseInt(req.params.id);
  let resultado = [];
  if (typeof codigo === "number") {
    for (let curso of cursos) {
      if (curso.id === codigo) {
        resultado.push(curso);
        return res.json(resultado); // Devuelve el resultado encontrado como respuesta en formato JSON y finaliza la ejecución de la función
      }
    }
  }
  res.json([{ id: "Error", descripcion: "No se encontraron coincidencias." }]); // Si no se encontró un resultado, devuelve un mensaje de error en formato JSON
});

app.get("/curso/nombre/:nombre", (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  let resultado = [];
  for (let curso of cursos) {
    if (curso.nombre.toLowerCase().includes(nombre)) {
      resultado.push(curso);
    }
  }
  resultado.length > 0
    ? res.json(resultado) // Si se encontraron cursos que coinciden con el nombre, los envía como respuesta en formato JSON
    : res.json([
        { id: "Error", descripcion: "No se encontraron coincidencias." },
      ]); // Si no se encontraron cursos que coinciden con el nombre, envía un mensaje de error en formato JSON
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto local ${PORT}`);
});
