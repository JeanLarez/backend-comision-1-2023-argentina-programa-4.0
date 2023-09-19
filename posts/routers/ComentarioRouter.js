const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentariosControllers');

// Rutas para las categorías
router.get('/comentarios', comentarioController.obtenerComentarios);
router.post('/comentarios', comentarioController.crearComentario);
router.get('/comentario/:id', comentarioController.obtenerComentarioPorId);
router.put('/comentario/:id', comentarioController.actualizarComentario);
router.delete('/comentario/:id', comentarioController.eliminarComentario);

module.exports = router;