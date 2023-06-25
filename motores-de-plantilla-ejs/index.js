const express = require("express");
const app = express();
const PORT = 3000;

const computerProducts = [
  { id: 1, name: "Notebook Lenono", price: 720 },
  { id: 2, name: "Macbook Air 13", price: 1250 },
  { id: 3, name: "Tablet Droid 10.1", price: 350 },
  { id: 4, name: "Prueba", price: 350 },
];

app.set("view engine", "ejs"); // Configuración del motor de plantillas EJS
app.use(express.static("views")); // Configuración de la carpeta de vistas estáticas

app.get("/", (req, res) => {
  const data = {
    title: "Bienvenido a Nuestra WEB",
    message: "Nuestro primer servicio HTML, desde el motor de Plantillas EJS",
    titleCard1: "Motores de Plantilla",
    messageCard1:
      "Los motores de plantilla son herramientas que simplifican el proceso de desarrollo web al permitir la separación de la lógica de presentación del contenido. Facilitan la creación de páginas web dinámicas al combinar plantillas predefinidas con datos variables, lo que resulta en un flujo de trabajo más eficiente y una mayor flexibilidad.",
    titleCard2: "EJS",
    messageCard2:
      "EJS es una herramienta poderosa para generar HTML dinámico en aplicaciones web, permitiendo la integración de JavaScript y la manipulación de datos en las vistas de manera sencilla y eficiente. Con EJS, puedes separar la lógica de presentación de tu aplicación y generar vistas dinámicas basadas en los datos que recibes del servidor.",
  };

  res.render("index", data); // Renderiza la vista "index" con los datos proporcionados
});

app.get("/productos", (req, res) => {
  const data = {
    title: "Bienvenido a Nuestra WEB con EJS",
    message: "Nuestro primer servicio con contenido HTML",
    products: computerProducts, // Proporciona los datos de los productos a la vista
  };

  res.render("products", data); // Renderiza la vista "products" con los datos proporcionados
});

app.get("/*", (req, res) => {
  res.status(404); // Establece el código de estado 404 (Página no encontrada)
  const data = {
    title: "Error 404",
    message: "La Ruta solicitada no existe.",
    suggestSolution: "Verifique que la ruta sea correcta e intente de nuevo.",
  };
  res.render("error", data); // Renderiza la vista "error" con los datos proporcionados
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
