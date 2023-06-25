const express = require("express");
const cursos = require("./cursos.js");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenidos al servidor web con rutas dinámicas");
  console.log(cursos)
});

app.get("/cursos/:categoria", (req, res) => {
  //   console.log(req.params.categoria.trim().toLowerCase()); // Imprime la categoría de cursos recibida en la URL
  let parametro = req.params.categoria.trim().toLowerCase(); // Obtiene y normaliza la categoría de cursos recibida en la URL
  let resultado = [];
  if (parametro) {
    resultado = cursos.filter(
      (curso) => curso.categoria.toLowerCase() === parametro
    );
  }
  resultado.length > 0
    ? res.json(resultado)
    : res.json([
        { id: "Error", descripcion: "No se encontraron coincidencias." },
      ]); // Si no se encontraron cursos que coinciden con la categoría, envía un mensaje de error en formato JSON
});

app.get("/cursos", (req, res) => {
  const queryParams = Object.keys(req.query);
  let resultado = [];
  if (queryParams.length) {
    console.log("llegan los parámetros");
    resultado = cursos.filter(
      (curso) =>
        curso.nombre.toLowerCase().includes(req.query.nombre.toLowerCase()) &&
        curso.categoria.toLowerCase().includes(req.query.categoria.toLowerCase())
    );
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      console.log("No llegan parámetros. Envío el set de datos");
      res.json({ id: "Error", descripcion: "No se recibieron parametros." });
    }
  }
});

app.get("/curso/codigo/:id", (req, res) => {
  const codigo = parseInt(req.params.id);
  let resultado = [];
  if (typeof codigo === "number") {
    resultado = cursos.filter((curso) => curso.id === codigo);
  }

  resultado.length > 0
    ? res.json(resultado)
    : res.json([
        { id: "Error", descripcion: "No se encontraron coincidencias." },
      ]); // Si no se encontraron cursos que coinciden con el nombre, envía un mensaje de error en formato JSON
});

app.get("/curso/nombre/:nombre", (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  let resultado = [];
  if (nombre) {
    resultado = cursos.filter((curso) =>
      curso.nombre.toLowerCase().includes(nombre)
    ); // Si se encontraron cursos que coinciden con el nombre, los envía como respuesta en formato JSON
  }
  resultado.length > 0
    ? res.json(resultado)
    : res.json([
        { id: "Error", descripcion: "No se encontraron coincidencias." },
      ]); // Si no se encontraron cursos que coinciden con el nombre, envía un mensaje de error en formato JSON
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto local ${PORT}`);
});
