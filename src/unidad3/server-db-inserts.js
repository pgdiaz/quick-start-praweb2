// SERVER CON CONEXION A BASE DE DATOS MYSQL
// inicio en localhost:3020/registro

const http = require('http');
const fs = require('fs');
const mysql = require('mysql2');

// Crear una conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Cambia esto si tu base de datos está en otro servidor
  user: 'root',
  password: 'root',
  database: 'basenode',
});
// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/registro') {
    // Mostrar el formulario HTML
    fs.promises.readFile('formulario.html', 'utf8')
      .then((data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      })
      .catch((err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor.');
      });
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

      // Insertar los datos en la base de datos
      const sql = 'INSERT INTO contactos (apellido, nombres, email) VALUES (?, ?, ?)';
      const values = [apellido, nombres, email];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al insertar datos en la base de datos:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error interno del servidor.');
        } else {
          console.log('Datos insertados en la base de datos');
          // Mostrar una respuesta exitosa al usuario
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h1>Datos Insertados en la Base de Datos</h1>');
        }
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada.');
  }
});

const port = 3020;
server.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
