const Sequelize = require("sequelize");
const { db } = require("../config/db");

const Usuario = db.define(
  "Usuario",
  {
    Usuario_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Login: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    Password: {
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    Nombre: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true,
    },
  },
  { tableName: "Usuarios", timestamps: false }
);

module.exports = Usuario;
