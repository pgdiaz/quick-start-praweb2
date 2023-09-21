//SERVIDOR QUE CAPTURA PARAMETROS Y LOS INCRUSTA EN UNA PÁGINA HTML

const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');

const servidor = http.createServer((pedido, respuesta) => {
  // Parsea la URL para obtener los parámetros
  const parametros = url.parse(pedido.url, true).query;

  // Obtén los valores de los parámetros (si existen)
  const nombre = parametros.nombre || 'Invitado';
  const apellido = parametros.apellido || '';

  // Ruta del archivo HTML existente
  const filePath = path.join(__dirname, 'bienvenida.html');

  // Lee el contenido del archivo HTML y procesa la respuesta
  fs.readFile(filePath, 'utf-8')
    .then(contenidoHtml => {
      // Reemplaza las etiquetas especiales en el HTML con los valores de los parámetros
      const paginaHtml = contenidoHtml
        .replace('{{nombre}}', nombre)
        .replace('{{apellido}}', apellido);

      // Configura los encabezados de la respuesta
      respuesta.writeHead(200, { 'Content-Type': 'text/html' });

      // Envía la página HTML con los valores incrustados
      respuesta.end(paginaHtml);
    })
    .catch(error => {
      // Maneja errores de lectura del archivo
      respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
      respuesta.end('Error interno del servidor');
    });
});

const PORT = 3010;
servidor.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
