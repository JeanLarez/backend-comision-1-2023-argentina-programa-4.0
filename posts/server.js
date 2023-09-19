const express = require("express");
const app = express();
const { db } = require("./config/db");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await db.authenticate();
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el servidor", description: error.message });
  }
});

const CategoriaRouter = require("./routers/CategoriaRouter");
const ComentarioRouter = require("./routers/ComentarioRouter");
const EtiquetaRouter = require("./routers/EtiquetaRouter");
const Post_etiquetaRouter = require("./routers/Post_etiquetaRouter");
const PostRouter = require("./routers/PostRouter");
const UsuarioRouter = require("./routers/UsuarioRouter");

app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API con MySQL y Sequelize");
});

app.use("/api", CategoriaRouter);
app.use("/api", ComentarioRouter);
app.use("/api", EtiquetaRouter);
app.use("/api", Post_etiquetaRouter);
app.use("/api", PostRouter);
app.use("/api", UsuarioRouter);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
