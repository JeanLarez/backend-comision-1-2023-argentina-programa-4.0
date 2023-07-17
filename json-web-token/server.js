const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;
const userToValidate = { username: "Cameron", password: "claveDeCameron" };

app.use(express.json());

app.post("/login", (req, res) => {
  // Obtener los datos de inicio de sesión de la solicitud
  const username = req.body.username;
  const password = req.body.password;
  console.log(`Datos recibidos: Usuario: ${username}, Password: ${password}`);

  // Verificar si las credenciales son válidas
  if (
    username === userToValidate.username &&
    password === userToValidate.password
  ) {
    // Generar un token JWT válido por 1 hora y enviarlo en la respuesta
    const token = jwt.sign({ username: username }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token: token });
  } else {
    // Responder con un código de estado 401 si las credenciales son inválidas
    res.status(401).json({ error: "Credenciales inválidas." });
  }
});

function verifyToken(req, res, next) {
  // Obtener el token de los encabezados de autorización
  const token = req.headers["authorization"] || null;
  if (token) {
    // Verificar el token JWT usando la clave secreta
    jwt.verify(token, secretKey, (err, decoded) => {
      // Responder con un código de estado 401 si el token es inválido
      err
        ? res.status(401).json({ error: "Token inválido." })
        : (req.decoded = decoded);
      next(); // Llamar al siguiente middleware
    });
  } else {
    // Responder con un código de estado 401 si no se proporciona un token
    res.status(401).json({ error: "Token no proporcionado." });
  }
}

app.get("/rutaprotegida", verifyToken, (req, res, next) => {
  // Obtener el nombre de usuario decodificado del token y responder con un mensaje
  const username = req.decoded.username;
  res.json({ mensaje: `Hola, ${username}! Esta ruta está protegida` });
  next();
});

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
