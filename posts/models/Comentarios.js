const Sequelize = require('sequelize');
const { db } = require("../config/db");

  const Comentario = db.define('Comentario', {
    Comentario_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Contenido_comentario: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },  { tableName: "Comentarios", timestamps: false });

//   // Definir relaciones
//   Comentario.associate = (models) => {
//     Comentario.belongsTo(models.Usuario, {
//       foreignKey: 'Usuario_ID',
//       onDelete: 'CASCADE'
//     });
//     Comentario.belongsTo(models.Post, {
//       foreignKey: 'Post_ID',
//       onDelete: 'CASCADE'
//     });
//   };

  module.exports = Comentario;

