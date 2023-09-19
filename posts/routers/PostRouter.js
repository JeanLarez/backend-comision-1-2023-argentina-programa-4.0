const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsControllers');

// Rutas para las categorías
router.get('/posts', postController.listarPosts);
router.post('/posts', postController.crearPost);
router.get('/post/:id', postController.obtenerPost);
router.put('/post/:id', postController.actualizarPost);
router.delete('/post/:id', postController.eliminarPost);
router.get('/post/:id/comentarios', postController.obtenerComentariosDePost);
router.get('/post/:id/etiquetas', postController.obtenerEtiquetasDePublicacion);

module.exports = router;

