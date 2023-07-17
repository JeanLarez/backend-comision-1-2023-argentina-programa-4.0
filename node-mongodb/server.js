const express = require("express");
const { connectToDB, disconnectFromMongoDB } = require("./src/mongodb");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

// Ruta para obtener una fruta por su nombre
app.get("/frutas/nombre/:nombre", async (req, res) => {
  const frutaQuery = req.params.nombre;
  let frutaNombre = RegExp(frutaQuery, "i");
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de frutas y buscar la fruta por su Nombre
    const db = client.db("frutas");
    const fruta = await db
      .collection("frutas")
      .find({ nombre: frutaNombre })
      .toArray();
    // const fruta = await db.collection("frutas").find({ nombre: {$regex: frutaNombre}}).toArray();
    if (fruta.length > 0) {
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

// Ruta para obtener una fruta por su importe
app.get("/frutas/precio/:precio", async (req, res) => {
  const frutaPrecio = parseInt(req.params.precio);
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de frutas y buscar la fruta por su precio
    const db = client.db("frutas");
    const fruta = await db
      .collection("frutas")
      .find({ importe: { $gte: frutaPrecio } })
      .toArray();

    if (fruta.length > 0) {
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

// Ruta para agregar un nuevo recurso
app.post("/frutas", async (req, res) => {
  const nuevaFruta = req.body;
  try {
    if (nuevaFruta === undefined) {
      res.status(400).send("Error en el formato de datos a crear.");
    }

    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
    }

    const db = client.db("frutas");
    const collection = db.collection("frutas");
    await collection.insertOne(nuevaFruta);
    console.log("Nueva fruta creada");
    res.status(201).send(nuevaFruta);
  } catch (error) {
    // Manejo de errores al agregar la fruta
    res.status(500).send("Error al intentar agregar una nueva fruta");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

//Ruta para modificar un recurso
app.put("/frutas/:id", async (req, res) => {
  const idFruta = parseInt(req.params.id);
  const nuevosDatos = req.body;
  try {
    if (!nuevosDatos) {
      res.status(400).send("Error en el formato de datos a crear.");
    }

    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
    }

    const db = client.db("frutas");
    const collection = db.collection("frutas");

    await collection.updateOne({ id: idFruta }, { $set: nuevosDatos });

    console.log("Fruta Modificada");

    res.status(200).send(nuevosDatos);
  } catch (error) {
    // Manejo de errores al modificar la fruta
    res.status(500).send("Error al modificar la fruta");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});


//Ruta para modificar un campo en un recurso
app.patch("/frutas/:id", async (req, res) => {
  const idFruta = parseInt(req.params.id);
  const nuevosDatos = req.body;
  try {
    if (!nuevosDatos) {
      res.status(400).send("Error en el formato de datos a crear.");
    }

    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
    }

    const db = client.db("frutas");
    const collection = db.collection("frutas");

    await collection.updateOne({ id: idFruta }, { $set: nuevosDatos });

    console.log("Fruta Modificada");

    res.status(200).send(nuevosDatos);
  } catch (error) {
    // Manejo de errores al modificar la fruta
    res.status(500).send("Error al modificar la fruta");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Ruta para eliminar un recurso
app.delete("/frutas/:id", async (req, res) => {
  const idFruta = parseInt(req.params.id);
  try {
    if (!idFruta) {
      res.status(400).send("Error en el formato de datos a crear.");
      return;
    }

    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de frutas, buscar la fruta por su ID y eliminarla
    const db = client.db("frutas");
    const collection = db.collection("frutas");
    const resultado = await collection.deleteOne({ id: idFruta });
    if (resultado.deletedCount === 0) {
      res
        .status(404)
        .send("No se encontró ninguna fruta con el id seleccionado.");
    } else {
      console.log("Fruta Eliminada");
      res.status(204).send();
    }
  } catch (error) {
    // Manejo de errores al obtener las frutas
    res.status(500).send("Error al eliminar la fruta");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
