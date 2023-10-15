const http = require('http');

// Lista de productos (supongamos que esto es tu base de datos)
const productos = [
    { tipo: 'Mueble', subtipo: 'Sofá', detalle: 'Sofá de cuero negro', imagen: 'sofa.jpg' },
    { tipo: 'Mueble', subtipo: 'Mesa', detalle: 'Mesa de comedor', imagen: 'mesa.jpg' },
    // Agregar más productos aquí
];

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Generar la página HTML completa
        const paginaHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Listado de Productos</title>
      </head>
      <body>
        <h1>Listado de Productos</h1>
        <div id="productos">
          ${generarVistasParciales(productos)} <!-- Genera las vistas parciales de productos -->
        </div>
      </body>
      </html>
    `;

        res.setHeader('Content-Type', 'text/html');
        res.end(paginaHTML);
    } else {
        res.statusCode = 404;
        res.end('Ruta no encontrada');
    }
});

function generarVistasParciales(productos) {
    // Generar vistas parciales para cada producto y concatenarlas
    return productos.map(producto => `
    <div class="producto">
      <h2>${producto.tipo} - ${producto.subtipo}</h2>
      <p>${producto.detalle}</p>
      <img src="${producto.imagen}" alt="${producto.tipo} - ${producto.subtipo}">
    </div>
  `).join('');
}

server.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
