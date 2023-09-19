const { Usuario, Post, Comentario } = require("../config/associations"); // Importa el modelo Usuario

// Controlador para listar todos los usuarios
async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al consultar usuarios", error);
    res.status(500).json({ error: "Error al consultar usuarios" });
  }
}

// Controlador para crear un nuevo usuario
const crearUsuario = async(req, res) => {
  const { Login, Password, Nombre, Email } = req.body;

  try {
    const nuevoUsuario = await Usuario.create({ Login, Password, Nombre, Email });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear un usuario", error);
    res.status(500).json({ error: "Error al crear un usuario" });
  }
}

// Controlador para obtener un usuario por su ID
const obtenerUsuario = async (req, res) => {
  const usuarioID = req.params.id;

  try {
    const usuario = await Usuario.findByPk(usuarioID);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
}

// Controlador para actualizar un usuario por su ID
const actualizarUsuario = async (req, res) => {
  const usuarioID = req.params.id;
  const { Login, Password, Nombre, Email } = req.body;

  try {
    const usuario = await Usuario.findByPk(usuarioID);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await usuario.update({ Login, Password, Nombre, Email });
    res.json(usuario);
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
}

// Controlador para eliminar un usuario por su ID
const eliminarUsuario = async (req, res) => {
  const usuarioID = req.params.id;

  try {
    const usuario = await Usuario.findByPk(usuarioID);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await usuario.destroy();
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
}

// Controlador para obtener todos los comentarios de un usuario por su ID
const obtenerComentariosDeUsuario = async (req, res) => {
  const usuarioID = req.params.id; // Deberías obtener el ID del usuario de los parámetros de la solicitud

  try {
    // Primero, busca al usuario por su ID
    const usuario = await Usuario.findByPk(usuarioID);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Luego, utiliza la relación entre Usuario y Comentario para obtener los comentarios del usuario
    const comentarios = await Comentario.findAll({
      where: { Usuario_ID: usuarioID }, // Esto asume que el campo en la tabla de Comentario se llama UsuarioID
    });

    res.json(comentarios);
  } catch (error) {
    console.error('Error al obtener los comentarios del usuario', error);
    res.status(500).json({ error: 'Error al obtener los comentarios del usuario' });
  }
};

const presentarUsuariosYComentarios = async (req, res) => {
  try {
    // Realiza una consulta que combine los datos de Usuario y Comentario
    const usuariosComentarios = await Usuario.findAll({
      include: {
        model: Comentario, // Indica que deseas incluir el modelo de Usuario
        attributes: ['Contenido_comentario'], // Puedes especificar qué atributos del modelo de Usuario deseas incluir
      },
    });

    res.json(usuariosComentarios);
  } catch (error) {
    console.error('Error al obtener comentarios con usuarios', error);
    res.status(500).json({ error: 'Error al obtener comentarios con usuarios' });
  }
};

// Exporta los controladores
module.exports = {
  listarUsuarios,
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerComentariosDeUsuario,
  presentarUsuariosYComentarios
};
