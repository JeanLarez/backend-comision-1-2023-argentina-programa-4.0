const Sequelize = require("sequelize");
const { db } = require("../config/db");

  const Categoria = db.define('Categoria', {
    Categoria_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Nombre_categoria: {
      type: Sequelize.STRING(30),
      allowNull: false
    }
  }, { tableName: "Categorias", timestamps: false });

  module.exports = Categoria;

  
