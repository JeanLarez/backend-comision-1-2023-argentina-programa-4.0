const { Post, Comentario, Usuario, Etiqueta, PostEtiqueta } = require("../config/associations");

// Controlador para listar todos los posts
const listarPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error("Error al listar posts", error);
    res.status(500).json({ error: "Error al listar posts" });
  }
};

// Controlador para crear un nuevo post
const crearPost = async (req, res) => {
  const {
    Titulo,
    Fecha_publicacion,
    Contenido_post,
    Usuario_ID,
    Categoria_ID,
  } = req.body;
  try {
    const nuevoPost = await Post.create({
      Titulo,
      Fecha_publicacion,
      Contenido_post,
      Usuario_ID,
      Categoria_ID,
    });
    res.json(nuevoPost);
  } catch (error) {
    console.error("Error al crear post", error);
    res.status(500).json({ error: "Error al crear post" });
  }
};

// Controlador para obtener un post por su ID
const obtenerPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ error: "Post no encontrado" });
      return;
    }
    res.json(post);
  } catch (error) {
    console.error("Error al obtener post", error);
    res.status(500).json({ error: "Error al obtener post" });
  }
};

// Controlador para actualizar un post por su ID
const actualizarPost = async (req, res) => {
  const { id } = req.params;
  const {
    Titulo,
    Fecha_publicacion,
    Contenido_post,
    Usuario_ID,
    Categoria_ID,
  } = req.body;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ error: "Post no encontrado" });
      return;
    }

    await usuario.update({
      Titulo,
      Fecha_publicacion,
      Contenido_post,
      Usuario_ID,
      Categoria_ID,
    });

    res.json(post);
  } catch (error) {
    console.error("Error al actualizar post", error);
    res.status(500).json({ error: "Error al actualizar post" });
  }
};

// Controlador para eliminar un post por su ID
const eliminarPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ error: "Post no encontrado" });
      return;
    }
    await post.destroy();
    res.json({ mensaje: "Post eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar post", error);
    res.status(500).json({ error: "Error al eliminar post" });
  }
};

// Controlador para obtener comentarios relacionados con un post
const obtenerComentariosDePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    // Luego, utiliza la relación entre Post y Comentario para obtener los comentarios del Post
    const comentarios = await Comentario.findAll({
      where: { Post_ID: id },
    });

    res.json(comentarios);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};



const obtenerEtiquetasDePublicacion = async (req, res) => {
  try {
    const postId = req.params.id; // Obtén el ID de la publicación desde los parámetros de la ruta

    // Busca la publicación por su ID y luego incluye las etiquetas relacionadas
    const publicacion = await Post.findByPk(postId, {
      include: 
      {
        model: Etiqueta, // Incluye la asociación con el modelo Etiqueta
        attribute: ["Nombre_etiqueta"]
      } 
    });

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }

    // Accede a las etiquetas a través de la propiedad incluida
    const etiquetas = publicacion;

    res.status(200).json(etiquetas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las etiquetas de la publicación' });
  }
};


module.exports = {
  listarPosts,
  crearPost,
  obtenerPost,
  actualizarPost,
  eliminarPost,
  obtenerComentariosDePost,
  obtenerEtiquetasDePublicacion
};
