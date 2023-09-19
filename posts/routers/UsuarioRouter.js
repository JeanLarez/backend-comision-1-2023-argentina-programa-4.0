const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariosControlers");

// Ruta para listar todos los usuarios
router.get("/usuarios", usuarioController.listarUsuarios);

// Ruta para crear un nuevo usuario
router.post("/usuarios", usuarioController.crearUsuario);

// Ruta para obtener un usuario por su ID
router.get("/usuario/:id", usuarioController.obtenerUsuario);

// Ruta para actualizar un usuario por su ID
router.put("/usuario/:id", usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario por su ID
router.delete("/usuario/:id", usuarioController.eliminarUsuario);

router.get("/usuarios/comentarios", usuarioController.presentarUsuariosYComentarios);

router.get("/usuario/comentarios/:id", usuarioController.obtenerComentariosDeUsuario);

module.exports = router;
