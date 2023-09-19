const Sequelize = require("sequelize");
const dotenv = require('dotenv')
dotenv.config()

const { DB_SCHEMA, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const db = new Sequelize(DB_SCHEMA, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

// async function authenticate() {
//   try {
//     await db.authenticate();
//     console.log("Conexion a la base de datos establecida correctamente");
//   } catch (error) {
//     console.error("Error al conectar a la base de Datos ", error);
//   }
// }

// async function closeConnection() {
//   try {
//     await db.close();
//     console.log("Conexión cerrada correctamente");
//   } catch (error) {
//     console.error("Error al cerrar la conexion ", error);
//   }
// }

module.exports = { db }; 
