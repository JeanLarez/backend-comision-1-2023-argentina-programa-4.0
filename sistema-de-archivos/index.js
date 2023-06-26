// Importar Express y crear una aplicación Express
const express = require("express");
const app = express();

// Puerto en el que se ejecutará el servidor
const PORT = 3000;

// Importar el módulo 'fs' para leer archivos
const fs = require("fs");

// Ruta para obtener todos los productos
app.get("/productos", (req, res) => {
    // Leer el archivo 'products.json'
    fs.readFile("products.json", "utf-8", (error, data) => {
        if(error){
            // Si hay un error al leer el archivo, se envía una respuesta con el error
            res.json({error: error});
            return;
        }
        // Si no hay errores, se envía como respuesta los datos del archivo JSON parseados
        res.json(JSON.parse(data));
    });
});

// Ruta para obtener un producto por su ID
app.get("/productos/id/:id", (req, res) => {
    let idProductoConsultado = parseInt(req.params.id);
    fs.readFile("products.json", "utf-8", (error, data) => {
        if(error){
            res.json({error: error});
            return;
        }
        let productos = JSON.parse(data);
        // Buscar el producto que coincida con el ID consultado
        let respuesta = productos.find((producto) => producto.id === idProductoConsultado);
        // Si se encuentra el producto, se envía como respuesta
        // Si no se encuentra, se envía un mensaje de error
        respuesta ? res.json(respuesta) : res.json({error: `No existen coincidencias para el id ${idProductoConsultado}`});
    });
});

// Ruta para buscar productos por su nombre (insensible a mayúsculas y minúsculas)
app.get("/productos/nombre/:nombre", (req, res) => {
    let nombreProductoConsultado = req.params.nombre.toLowerCase();
    fs.readFile("products.json", "utf-8", (error, data) => {
        if(error){
            res.json({error: error});
            return;
        }
        let productos = JSON.parse(data);
        // Filtrar los productos que contengan el nombre consultado
        let respuesta = productos.filter(elemento => elemento.nombre.toLowerCase().includes(nombreProductoConsultado));
        // Si se encuentran productos, se envían como respuesta
        // Si no se encuentran, se envía un mensaje de error
        respuesta.length ? res.json(respuesta) : res.json({error: `No existen coincidencias para el producto ${nombreProductoConsultado}`});
    });
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
