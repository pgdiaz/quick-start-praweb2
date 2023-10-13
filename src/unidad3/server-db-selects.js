// IMPLEMENTACION DE LECTUAR DE REGISTROS DESDE LA BASE DE DATOS
// inicio en localhost:3020/registro

const http = require('http');
const fs = require('fs');
const mysql = require('mysql2');

// Crear una conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos está en otro servidor
  user: 'root',
  password: 'root',
  database: 'base1',
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
          // Mostrar una respuesta exitosa al usuario con enlaces
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<h1>Datos Insertados en la Base de Datos</h1>');
          res.write('<p><a href="/registro">Volver al formulario de registro</a></p>');
          res.write('<p><a href="/mostrar">Mostrar datos registrados</a></p>');
          res.end();
        }
      });
    });

  } else if (req.method === 'GET' && req.url === '/mostrar') {
    // Consultar y mostrar los datos registrados en una tabla HTML
    const sql = 'SELECT * FROM contactos';

    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Error al consultar la base de datos:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Datos Registrados</h1>');
        res.write('<p><a href="/registro">Volver al formulario de registro</a></p>');
        res.write('<table border="1">');
        res.write('<tr><th>ID</th><th>Apellido</th><th>Nombres</th><th>Email</th></tr>');
        // leemos las filas del resulatdo de la consulta
        // forEach recorre el array de filas y devuelve una a una cada fila
        rows.forEach((row) => {

          res.write(`<tr><td>${row.idContacto}</td><td>${row.apellido}</td><td>${row.nombres}</td><td>${row.email}</td></tr>`);
        
        });

        res.write('</table>');
        res.end();
      }
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
