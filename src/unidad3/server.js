// IMPLEMENTACION DEL METODO POST EN EL SERVER
// INICIO EN localhost:3020/registro

const http = require('http');
const fs = require('fs');
const path = require('path');

const htmlContentType = 'text/html; charset=utf-8';
const plainContentType = 'text/plain; charset=utf-8';

console.clear();
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/registro') {
    // Mostrar el formulario HTML
    const filePath = path.join(__dirname, 'formulario.html');
    fs.promises.readFile(filePath, 'utf8')
      .then((data) => {
        res.writeHead(200, { 'Content-Type': htmlContentType });
        res.end(data);
      })
      .catch((err) => {
        res.writeHead(500, { 'Content-Type': plainContentType });
        res.end('Error interno del servidor.');
      });
    // procesamos el pedido post 
  } else if (req.method === 'POST' && req.url === '/formulario') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      // Procesar los datos del formulario
      const parsedData = new URLSearchParams(body);
      const apellido = parsedData.get('apellido');
      const nombres = parsedData.get('nombres');
      const email = parsedData.get('email');
      // Mostrar la respuesta
      res.writeHead(200, { 'Content-Type': htmlContentType });
      res.end(`<h1>Datos Recibidos</h1><p>Apellido: ${apellido}</p><p>Nombre: ${nombres}</p><p>Email: ${email}</p>`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': plainContentType });
    res.end('Página no encontrada.');
  }
});

const port = 3020;
server.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
