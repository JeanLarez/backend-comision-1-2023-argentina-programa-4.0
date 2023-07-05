const express = require("express");
const { connectToDB, disconnectFromMongoDB } = require("./src/mongodb");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para establecer el encabezado Content-Type en las respuestas
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

// Ruta de inicio
app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API de Frutas");
});

// Ruta para obtener todas las frutas
app.get("/frutas", async (req, res) => {
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de frutas y convertir los documentos a un array
    const db = client.db("frutas");
    const frutas = await db.collection("frutas").find().toArray();
    res.json(frutas);
  } catch (error) {
    // Manejo de errores al obtener las frutas
    res.status(500).send("Error al obtener las frutas de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Ruta para obtener una fruta por su ID
app.get("/fruta/:id", async (req, res) => {
  const frutaId = parseInt(req.params.id);
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de frutas y buscar la fruta por su ID
    const db = client.db("frutas");
    const fruta = await db.collection("frutas").findOne({ id: frutaId });
    if (fruta) {
      res.json(fruta);
    } else {
      res.status(404).send("Fruta no encontrada");
    }
  } catch (error) {
    // Manejo de errores al obtener la fruta
    res.status(500).send("Error al obtener la fruta de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
