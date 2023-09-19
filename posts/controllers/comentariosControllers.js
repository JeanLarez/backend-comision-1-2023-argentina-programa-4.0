const { Comentario, Usuario, Post } = require("../config/associations");

// Crear un comentario
const crearComentario = async (req, res) => {
  const { Contenido_comentario, Usuario_ID, Post_ID } = req.body;
  try {
    const comentario = await Comentario.create({
      Contenido_comentario,
      Usuario_ID,
      Post_ID,
    });
    res.json(comentario);
  } catch (error) {
    console.error("Error al crear comentario", error);
    res.status(500).json({ error: "Error al crear comentario" });
  }
};

// Obtener todos los comentarios
const obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll();
    res.json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios", error);
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
};

// Obtener un comentario por ID
const obtenerComentarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const comentario = await Comentario.findByPk(id);
    if (!comentario) {
      res.status(404).json({ error: "Comentario no encontrado" });
      return;
    }
    res.json(comentario);
  } catch (error) {
    console.error("Error al obtener comentario por ID", error);
    res.status(500).json({ error: "Error al obtener comentario por ID" });
  }
};


// Actualizar un comentario por ID
const actualizarComentario = async (req, res) => {
  const { id } = req.params;
  const { Contenido_comentario, Usuario_ID, Post_ID } = req.body;

  try {
    const comentario = await Comentario.findByPk(id);
    if (!comentario) {
      res.status(404).json({ error: "Comentario no encontrado" });
      return;
    }

    await comentario.update({
      Contenido_comentario,
      Usuario_ID,
      Post_ID,
    });

    res.json(comentario);
  } catch (error) {
    console.error("Error al actualizar comentario", error);
    res.status(500).json({ error: "Error al actualizar comentario" });
  }
};

// Eliminar un comentario por ID
const eliminarComentario = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Comentario.destroy({
      where: { Comentario_id: id },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: "Comentario no encontrado" });
      return;
    }

    res.json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar comentario", error);
    res.status(500).json({ error: "Error al eliminar comentario" });
  }
};

module.exports = {
  crearComentario,
  obtenerComentarios,
  obtenerComentarioPorId,
  actualizarComentario,
  eliminarComentario,
};
