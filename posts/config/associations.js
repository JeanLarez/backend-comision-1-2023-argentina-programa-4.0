const Categoria = require('../models/Categorias');
const Comentario = require('../models/Comentarios');
const Etiqueta = require('../models/Etiquetas');
const PostEtiqueta = require('../models/Posts_etiquetas');
const Post = require('../models/Posts');
const Usuario = require('../models/Usuarios');

// Configurar relaciones
Categoria.hasMany(Post, { foreignKey: 'Categoria_ID' });
Post.belongsTo(Categoria, { foreignKey: 'Categoria_ID' });

Usuario.hasMany(Post, { foreignKey: 'Usuario_ID' });
Post.belongsTo(Usuario, { foreignKey: 'Usuario_ID' });

Usuario.hasMany(Comentario, { foreignKey: 'Usuario_ID' });
Comentario.belongsTo(Usuario, { foreignKey: 'Usuario_ID' });

Post.hasMany(Comentario, { foreignKey: 'Post_ID' });
Comentario.belongsTo(Post, { foreignKey: 'Post_ID' });

// Configurar relación muchos a muchos entre Post y Etiqueta a través de PostEtiqueta
Post.belongsToMany(Etiqueta, { through: PostEtiqueta, foreignKey: 'Post_ID' });
Etiqueta.belongsToMany(Post, { through: PostEtiqueta, foreignKey: 'Etiqueta_ID' });


module.exports = {
    Categoria,
    Comentario,
    Etiqueta,
    PostEtiqueta,
    Post,
    Usuario,
};