const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_SCHEMA, 
                                process.env.DB_USER, 
                                process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5, // Máximo de conexiones en el grupo
      min: 0, // Mínimo de conexiones en el grupo
      acquire: 30000, // Tiempo máximo, para liberar conexiones inactivas
      idle: 10000, // Tiempo máximo para cerrar conexiones inactivas
    },
});

module.exports = sequelize;