const dotenv = require("dotenv");
dotenv.config(); // Carga las variables de entorno desde el archivo .env

const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URLSTRING; // Obtiene la URL de conexión a MongoDB desde las variables de entorno
const client = new MongoClient(URI); // Crea una instancia del cliente de MongoDB

const connectToDB = async () => {
  try {
    await client.connect(); // Conecta al cliente de MongoDB al servidor
    console.log("Conectado a MongoDB");
    return client; // Retorna el cliente conectado
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    return null; // Retorna null en caso de error
  }
};

const disconnectFromMongoDB = async () => {
  try {
    await client.close(); // Cierra la conexión con el servidor de MongoDB
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al desconectar de MongoDB:", error);
    return null; // Retorna null en caso de error
  }
};

module.exports = { connectToDB, disconnectFromMongoDB };
