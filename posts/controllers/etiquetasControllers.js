const { Etiqueta, Post } = require("../config/associations");

// Controlador para crear una nueva etiqueta
const crearEtiqueta = async (req, res) => {
  try {
    const nuevaEtiqueta = await Etiqueta.create(req.body);
    res.json(nuevaEtiqueta);
  } catch (error) {
    console.error("Error al crear etiqueta", error);
    res.status(500).json({ error: "Error al crear etiqueta" });
  }
};

// Controlador para obtener todas las etiquetas
const obtenerEtiquetas = async (req, res) => {
  try {
    const etiquetas = await Etiqueta.findAll();
    res.json(etiquetas);
  } catch (error) {
    console.error("Error al obtener etiquetas", error);
    res.status(500).json({ error: "Error al obtener etiquetas" });
  }
};

// Controlador para obtener una etiqueta por ID
const obtenerEtiquetaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const etiqueta = await Etiqueta.findByPk(id);
    if (!etiqueta) {
      res.status(404).json({ error: "Etiqueta no encontrada" });
      return;
    }
    res.json(etiqueta);
  } catch (error) {
    console.error("Error al obtener etiqueta por ID", error);
    res.status(500).json({ error: "Error al obtener etiqueta por ID" });
  }
};

// Controlador para actualizar una etiqueta por ID
const actualizarEtiqueta = async (req, res) => {
  const { id } = req.params;
  const { Nombre_etiqueta } = req.body;
  try {
    const etiqueta = await Etiqueta.findByPk(id);
    if (!etiqueta) {
      res.status(404).json({ error: "Etiqueta no encontrada" });
      return;
    }

    await etiqueta.update({Nombre_etiqueta});
    res.json(etiqueta);
  } catch (error) {
    console.error("Error al actualizar etiqueta", error);
    res.status(500).json({ error: "Error al actualizar etiqueta" });
  }
};

// Controlador para eliminar una etiqueta por ID
const eliminarEtiqueta = async (req, res) => {
  const { id } = req.params;
  try {
    const etiqueta = await Etiqueta.findByPk(id);
    if (!etiqueta) {
      res.status(404).json({ error: "Etiqueta no encontrada" });
      return;
    }
    await etiqueta.destroy();
    res.json({ mensaje: "Etiqueta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar etiqueta", error);
    res.status(500).json({ error: "Error al eliminar etiqueta" });
  }
};

module.exports = {
  crearEtiqueta,
  obtenerEtiquetas,
  obtenerEtiquetaPorId,
  actualizarEtiqueta,
  eliminarEtiqueta
};
