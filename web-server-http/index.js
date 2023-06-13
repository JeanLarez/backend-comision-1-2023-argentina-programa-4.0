/* En esta línea se importa el módulo http de Node.js, que proporciona funcionalidades para crear servidores y manejar solicitudes HTTP. */
const http = require("http");

/* Aquí se define el número de puerto en el cual el servidor estará escuchando las solicitudes entrantes. */
const PORT = 3008;

/* Se crea el servidor HTTP utilizando el método createServer del módulo http. Se proporciona una función callback que será ejecutada cada vez que se reciba una solicitud. Esta función se encargará de manejar las solicitudes y enviar las respuestas correspondientes. */
const server = http.createServer((req, res) => {

/*En este bloque se realiza una serie de comprobaciones condicionales (if, else if, else) para determinar la ruta solicitada por el cliente. Dependiendo de la ruta, se envía una respuesta específica. Si la ruta no coincide con ninguna de las opciones anteriores, se envía una respuesta de "Ruta Inexistente".*/
    if(req.url === "/"){
/*Aquí se establece el encabezado de la respuesta HTTP con el estado 200 (éxito) y el tipo de contenido "text/html". Luego, se envía como respuesta el mensaje "<h1>Bienvenidos a Nuestra WEB</h1>", que será mostrado en el navegador del cliente. */
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("<h1>Bienvenidos a Nuestra WEB</h1>");
    } else if(req.url === "/cursos"){
        res.writeHead(200, {"Content-Type": "text/html; charset=utf8" });
        res.end("<h1>Bienvenidos a Nuestra Sección de Cursos</h1>");
    } else if(req.url === "/contacto"){
        res.writeHead(200, {"Content-Type": "text/html; charset=utf8" });
        res.end("<h1>argentinaprograma@mail.com</h1>");
    } else {
        res.writeHead(404, {"Content-Type": "text/plain; charset=utf8" });
        res.end("Ruta Inexistente");
    }

})

/* Finalmente, se inicia el servidor y se especifica que escuche en el puerto definido en la constante PORT. Además, se muestra un mensaje en la consola indicando que el servidor está escuchando en ese puerto. */
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})