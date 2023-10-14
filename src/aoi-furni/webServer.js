const http = require('http');
const publicController = require('./controllers/publicController.js');
const viewController = require('./controllers/viewController.js');

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/public/')) {
        if (req.method === 'GET') {
            publicController.getResource(req, res);
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Método no permitido');
        }
    } else {
        if (req.method === 'GET') {
            viewController.getView(req, res);
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Método no permitido');
        }
    }
});

const port = 3020;
server.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});
