// Importar el módulo Express
const express = require("express");
const app = express();

// Configurar el número de puerto para el servidor
const PORT = 3000

// Importar el módulo fs para leer archivos
const fs = require("fs");

// Ruta para obtener todos los productos
app.get("/productos", (req, res) => {
    // Leer el archivo products.json
    fs.readFile("products.json", "utf-8", (error, data) => {
        if(error){
            // Si hay un error, enviar una respuesta JSON con el mensaje de error
            res.json({error: error})
            return
        }
        // Si no hay error, enviar los datos del archivo como respuesta en formato JSON
        res.json(JSON.parse(data))
    })
})

// Ruta para obtener un producto por su ID
app.get("/productos/id/:id", (req, res) => {
    // Obtener el ID del producto consultado desde los parámetros de la URL y convertirlo a un número entero
    let idProductoConsultado = parseInt(req.params.id)
    // Leer el archivo products.json
    fs.readFile("products.json", "utf-8", (error, data) => {
        if(error){
            // Si hay un error, enviar una respuesta JSON con el mensaje de error
            res.json({error: error})
            return
        }
        // Convertir los datos del archivo a un objeto JavaScript
        let productos = JSON.parse(data)
        // Buscar el producto con el ID consultado en el arreglo de productos
        let respuesta = productos.find((producto) => producto.id === idProductoConsultado)
        // Si se encuentra el producto, enviarlo como respuesta en formato JSON; de lo contrario, enviar un mensaje de error
        respuesta ? res.json(respuesta) : res.json({error: `No existen coincidencias para el id ${idProductoConsultado}`})
    })
})

// Ruta para buscar productos por su nombre
app.get("/productos/nombre/:nombre", (req, res) => {
    // Obtener el nombre del producto consultado desde los parámetros de la URL y convertirlo a minúsculas
    let nombreProductoConsultado = req.params.nombre.toLowerCase()
    // Leer el archivo products.json
    fs.readFile("products.json", "utf-8", (error, data) => {
        if(error){
            // Si hay un error, enviar una respuesta JSON con el mensaje de error
            res.json({error: error})
            return
        }
        // Convertir los datos del archivo a un objeto JavaScript
        let productos = JSON.parse(data);
        // Filtrar los productos que coincidan con el nombre consultado (ignorando mayúsculas y minúsculas)
        let respuesta = productos.filter(elemento => elemento.nombre.toLowerCase().includes(nombreProductoConsultado));
        
        // Si se encuentran productos, enviarlos como respuesta en formato JSON; de lo contrario, enviar un mensaje de error
        respuesta.length ? res.json(respuesta) : res.json({error: `No existen coincidencias para el producto ${nombreProductoConsultado}`}) 
    })
})

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
