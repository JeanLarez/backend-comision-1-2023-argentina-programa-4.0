const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriasControllers');

// Rutas para las categorías
router.get('/categorias', categoriaController.listarCategorias);
router.post('/categorias', categoriaController.crearCategoria);
router.get('/categoria/:id', categoriaController.obtenerCategoria);
router.put('/categoria/:id', categoriaController.actualizarCategoria);
router.delete('/categoria/:id', categoriaController.eliminarCategoria);

module.exports = router;
