const express = require('express');
const router = express.Router();
const etiquetasController = require("../controllers/etiquetasControllers");

// Rutas para el modelo de Etiquetas

// Ruta para crear una nueva etiqueta
router.post('/etiquetas', etiquetasController.crearEtiqueta);

// Ruta para obtener todas las etiquetas
router.get('/etiquetas', etiquetasController.obtenerEtiquetas);

// Ruta para obtener una etiqueta por ID
router.get('/etiqueta/:id', etiquetasController.obtenerEtiquetaPorId);

// Ruta para actualizar una etiqueta por ID
router.put('/etiqueta/:id', etiquetasController.actualizarEtiqueta);

// Ruta para eliminar una etiqueta por ID
router.delete('/etiqueta/:id', etiquetasController.eliminarEtiqueta);

module.exports = router;
