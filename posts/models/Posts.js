const Sequelize = require('sequelize');
const { db } = require("../config/db");

  const Post = db.define('Post', {
    Post_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Titulo: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    Fecha_publicacion: {
      type: Sequelize.DATE,
      allowNull: false
    },
    Contenido_post: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, { tableName: "Posts", timestamps: false });

//   // Definir relaciones
//   Post.associate = (models) => {
//     Post.belongsTo(models.Usuario, {
//       foreignKey: 'Usuario_ID',
//       onDelete: 'CASCADE'
//     });
//     Post.belongsTo(models.Categoria, {
//       foreignKey: 'Categoria_ID',
//       onDelete: 'CASCADE'
//     });
//     Post.belongsToMany(models.Etiqueta, {
//       through: 'Post_Etiquetas',
//       foreignKey: 'Post_ID'
//     });
//   };

  module.exports = Post;

