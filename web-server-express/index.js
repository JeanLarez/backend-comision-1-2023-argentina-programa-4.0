/* En estas líneas, se importa el módulo "express", se define el número de puerto en el cual el servidor estará escuchando las solicitudes entrantes, y se crea una instancia de la aplicación Express. */
const express = require("express");
const PORT = 3050;
const app = express();

/* En estos bloques de código, se definen manejadores para las diferentes rutas. Cuando se recibe una solicitud GET en la ruta especificada, se ejecuta la función de callback que recibe dos parámetros: req (la solicitud) y res (la respuesta). Dentro de cada manejador de ruta, se establece el estado de respuesta (200 para éxito) y se envía un mensaje HTML específico como respuesta utilizando el método res.send(). */
app.get("/", (req, res) => {
  res.status(200);
  res.send("<h1>Bienvenidos a Nuestra WEB</h1>");
});

app.get("/cursos", (req, res) => {
  res.status(200);
  res.send("<h1>Bienvenidos a Nuestra Sección de Cursos</h1>");
});

app.get("/contacto", (req, res) => {
  res.status(200);
  res.send("<h1>argentinaprograma@mail.com</h1>");
});

// app.use((req, res) => {
//     res.status(404).send("{“error”: “404”, “description”: “No se encuentra la ruta o recurso solicitado.”}")
// })

/* En este bloque, se define un manejador para todas las rutas que no coinciden con las rutas anteriores. Se utiliza el comodín "*" para capturar cualquier ruta no especificada. Dentro del manejador, se establece el estado de respuesta a 404 (no encontrado) y se envía un mensaje JSON como respuesta utilizando el método res.json().*/
app.get("/*", (req, res) => {
  res
    .status(404)
    .json(
      "{“error”: “404”, “description”: “No se encuentra la ruta o recurso solicitado.”}"
    );
});

/* Finalmente, se inicia el servidor y se especifica que escuche en el puerto definido en la constante PORT. Además, se muestra un mensaje en la consola indicando que el servidor está escuchando en ese puerto. */
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
