const fs = require('fs/promises');
const path = require('path');
const mimeType = require('../helpers/mimeTypeHelper.js')

exports.getResource = get;

function get(request, response) {
    const filePath = path.join(__dirname, '..', request.url);
    fs.readFile(filePath)
        .then(content => {
            response.writeHead(200, { 'Content-Type': mimeType.getFrom(request.url) });
            response.end(content);
        })
        .catch(err => {
            if (err.code === 'ENOENT') {
                response.writeHead(404, { 'Content-Type': mimeType.getTextPlain() });
                response.end('Recurso no encontrado');
            } else {
                response.writeHead(500, { 'Content-Type': mimeType.getTextPlain() });
                response.end('Error interno del servidor');
            }
        });
}
