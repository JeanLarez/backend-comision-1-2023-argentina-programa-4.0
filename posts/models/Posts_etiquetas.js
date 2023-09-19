const Sequelize = require('sequelize');
const { db } = require("../config/db");


  const PostEtiqueta = db.define('PostEtiqueta', {
    Post_etiqueta_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  }, { tableName: "Post_Etiquetas", timestamps: false });

  module.exports = PostEtiqueta;

