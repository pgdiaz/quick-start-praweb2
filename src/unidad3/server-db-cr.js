// SERVER CON ESTILOS DE BOOSTRAP 
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
  // Habilitar CORS para cualquier cliente
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'GET' && req.url === '/registro') {
        // Mostrar el formulario HTML
        fs.promises.readFile('formboot.html', 'utf8')
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
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Content-Language': 'es'
                  });
                
                // Agregar los enlaces a las CDN de Bootstrap aquí
                res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
                res.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>');
                res.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>');
                res.write('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>');

                res.write('<h1 class="mt-5">Datos Registrados</h1>');
                res.write('<p><a class="btn btn-secondary" href="/registro">Volver al formulario de registro</a></p>');
                res.write('<table class="table table-striped table-bordered mt-3">');
                res.write('<thead class="thead-dark">');
                res.write('<tr><th>ID</th><th>Apellido</th><th>Nombres</th><th>Email</th></tr>');
                res.write('</thead>');
                res.write('<tbody>');
                
                //leemos el array de filas ....
                rows.forEach((row) => {

                    res.write(`<tr><td>${row.idContacto}</td><td>${row.apellido.toUpperCase()}</td><td>${row.nombres.toUpperCase()}</td><td>${row.email}</td></tr>`);
                
                });

                res.write('</tbody>');
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
