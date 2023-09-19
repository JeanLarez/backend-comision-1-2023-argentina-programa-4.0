const { Categoria, Post } = require('../config/associations');

// Controlador para listar todas las categorías
const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error("Error al listar las categorías:", error);
    res.status(500).json({ error: "Error al listar las categorías" });
  }
};

// Controlador para crear una nueva categoría
const crearCategoria = async (req, res) => {
  const { Nombre_categoria } = req.body;
  try {
    const categoria = await Categoria.create({ Nombre_categoria });
    res.status(201).json(categoria);
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

// Controlador para obtener una categoría por su ID
const obtenerCategoria = async (req, res) => {
  const categoriaId = req.params.id;
  try {
    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

// Controlador para actualizar una categoría por su ID
const actualizarCategoria = async (req, res) => {
  const categoriaId = req.params.id;
  const { Nombre_categoria } = req.body;
  try {
    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    
    await categoria.update({Nombre_categoria})
    
    res.json(categoria);
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

// Controlador para eliminar una categoría por su ID
const eliminarCategoria = async (req, res) => {
  const categoriaId = req.params.id;
  try {
    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    await categoria.destroy();
    res.json({ mensaje: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

module.exports = {
    listarCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}