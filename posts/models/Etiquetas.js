const Sequelize = require('sequelize');
const { db } = require("../config/db");

  const Etiqueta = db.define('Etiqueta', {
    Etiqueta_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Nombre_etiqueta: {
      type: Sequelize.STRING(30),
      allowNull: false
    }
  }, { tableName: "Etiquetas", timestamps: false });

  module.exports = Etiqueta;



