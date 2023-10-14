const fs = require('fs/promises');
const path = require('path');

exports.getResource = get;

function get(req, res) {
    const filePath = path.join(__dirname, '..', req.url);
    fs.readFile(filePath)
        .then(content => {
            res.writeHead(200, { 'Content-Type': getContentType(req.url) });
            res.end(content);
        })
        .catch(err => {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Recurso no encontrado');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Error interno del servidor');
            }
        });
}

function getContentType(url) {
    const extension = url.split('.').pop();
    const mimeTypes = {
        'css': 'text/css',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'svg': 'image/svg+xml',
        'js': 'application/javascript'
    };

    return mimeTypes[extension];
}
