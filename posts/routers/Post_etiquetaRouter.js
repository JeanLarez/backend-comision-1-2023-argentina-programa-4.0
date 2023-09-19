const express = require('express');
const router = express.Router();
const etiquetaController = require('../controllers/postEtiquetasControllers');

// Rutas para las categorías
router.get('/posts_etiquetas', etiquetaController.obtenerPostEtiquetas);
router.post('/posts_etiquetas', etiquetaController.crearPostEtiqueta);
router.put('/post_etiqueta/:id', etiquetaController.actualizarPostEtiqueta);
router.delete('post_etiqueta/:id', etiquetaController.eliminarPostEtiqueta);

module.exports = router;