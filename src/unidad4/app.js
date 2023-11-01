const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public/'));
app.get('/index.html', (request, response) => {
    response.send('<html><head><meta charset="utf-8"><link rel="shortcut icon" href="./icons/favicon.png"></head><body><h1>Bienvenido a mi sitio con NodeJS y Express</h1></body></html>');
});
const port = 3020;
app.listen(port, () => console.log("El servidor está escuchando en el puerto: " + port));
