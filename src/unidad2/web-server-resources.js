// SERVIDOR QUE ENVIA MULTIPLES ARCHIVOS DE DIFERENTES TIPOS
// VERSION MEJORADA
const http = require('http');
const fs = require('fs/promises');
const path = require('path');

// Crea un servidor HTTP
const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:3010' + pedido.url);
  const filePath = path.join(__dirname, 'public');
  let camino = filePath + url.pathname;
  if (camino === 'public/') {
    camino = 'public/index.html';
  }

  // Llama a la función para servir el archivo
  serveFile(camino, respuesta);
});

// Función para servir un archivo
function serveFile(filePath, response) {
  console.log(filePath)
  fs.stat(filePath) // Obtiene información sobre el archivo
    .then(() => {
      return fs.readFile(filePath); // Lee el contenido del archivo
    })
    .then(content => {
      // Obtiene el tipo de contenido y configura el encabezado
      const contentType = getMimeType(filePath) || 'application/octet-stream';
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content); // Envía el contenido del archivo como respuesta
    })
    .catch(error => {
      if (error.code === 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<h1>Error 404: No existe el recurso solicitado</h1>');
      } else {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Error interno');
      }
    });
}

// Función para obtener el tipo de contenido (MIME type) según la extensión del archivo
function getMimeType(filePath) {
  const extension = filePath.split('.').pop();
  const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpeg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4',
    'pdf': 'application/pdf'
    // Puedes agregar más tipos de contenido aquí
  };

  return mimeTypes[extension];
}

// Escucha en el puerto 3010
servidor.listen(3010);
console.log('Servidor web iniciado');
