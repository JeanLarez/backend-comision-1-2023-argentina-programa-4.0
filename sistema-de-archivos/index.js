const express = require("express");
const app = express();
const PORT = 3000
const fs = require("fs");

app.get("/productos", (req, res) => {
    fs.readFile("products.json", "utf-8", (error, data) => {
        if(error){
            res.json({error: error})
            return
        }
        res.json(JSON.parse(data))
    })
})

app.get("/productos/id/:id", (req, res) => {
    let idProductoConsultado = parseInt(req.params.id)
    fs.readFile("products.json", "utf-8", (error, data) => {
        if(error){
            res.json({error: error})
            return
        }
        let productos = JSON.parse(data)
        let respuesta = productos.find((producto) => producto.id === idProductoConsultado)
        respuesta ? res.json(respuesta) : res.json({error: `No existen coincidencias para el id ${idProductoConsultado}`})
    })
})

app.get("/productos/nombre/:nombre", (req, res) => {
    let nombreProductoConsultado = req.params.nombre.toLowerCase()
    fs.readFile("products.json", "utf-8", (error, data) => {
        if(error){
            res.json({error: error})
            return
        }
        let productos = JSON.parse(data);
        let respuesta = productos.filter(elemento => elemento.nombre.toLowerCase().includes(nombreProductoConsultado));
        
        respuesta.length ? res.json(respuesta) : res.json({error: `No existen coincidencias para el producto ${nombreProductoConsultado}`}) 
    })
  
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
