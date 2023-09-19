const { PostEtiqueta, Post, Etiqueta } = require("../config/associations");

// Crear un nuevo registro de Post_Etiquetas
 const crearPostEtiqueta = async (req, res) => {
  const { Post_ID, Etiqueta_ID } = req.body;

  try {
    const postEtiqueta = await PostEtiqueta.create({
      Post_ID,
      Etiqueta_ID,
    });

    res.json(postEtiqueta);
  } catch (error) {
    console.error("Error al crear un nuevo registro de Post_Etiquetas", error);
    res
      .status(500)
      .json({ error: "Error al crear un nuevo registro de Post_Etiquetas" });
  }
};

// Obtener todos los registros de Post_Etiquetas
const obtenerPostEtiquetas = async (req, res) => {
  try {
    const postEtiquetas = await PostEtiqueta.findAll();
    res.json(postEtiquetas);
  } catch (error) {
    console.error("Error al obtener los registros de Post_Etiquetas", error);
    res
      .status(500)
      .json({ error: "Error al obtener los registros de Post_Etiquetas" });
  }
};

// Actualizar un registro de Post_Etiquetas por ID
const actualizarPostEtiqueta = async (req, res) => {
  const { id } = req.params;
  const { Post_ID, Etiqueta_ID } = req.body;

  try {
    const postEtiqueta = await PostEtiqueta.findByPk(id);
    if (!postEtiqueta) {
      res
        .status(404)
        .json({ error: "Registro de Post_Etiquetas no encontrado" });
      return;
    }

    await postEtiqueta.update({
      Post_ID,
      Etiqueta_ID,
    });

    res.json(postEtiqueta);
  } catch (error) {
    console.error("Error al actualizar un registro de Post_Etiquetas", error);
    res
      .status(500)
      .json({ error: "Error al actualizar un registro de Post_Etiquetas" });
  }
};

// Eliminar un registro de Post_Etiquetas por ID
const eliminarPostEtiqueta = async (req, res) => {
  const { id } = req.params;

  try {
    const postEtiqueta = await PostEtiqueta.findByPk(id);
    if (!postEtiqueta) {
      res
        .status(404)
        .json({ error: "Registro de Post_Etiquetas no encontrado" });
      return;
    }

    await postEtiqueta.destroy();

    res.json({ message: "Registro de Post_Etiquetas eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar un registro de Post_Etiquetas", error);
    res
      .status(500)
      .json({ error: "Error al eliminar un registro de Post_Etiquetas" });
  }
};


module.exports = {
  crearPostEtiqueta,
  obtenerPostEtiquetas,
  actualizarPostEtiqueta,
  eliminarPostEtiqueta,
};
