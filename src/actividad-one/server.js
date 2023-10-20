const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const url = require('url');

console.clear();

const servidor = http.createServer((solicitud, respuesta) => {
    const urlParse = url.parse(solicitud.url, true);
    let ruta = '/public' + urlParse.pathname;
    if (urlParse.pathname === '/' || getExtension(urlParse.pathname) === 'html') {
        // Se atienden recursos HTML
        ruta = 'view' + urlParse.pathname;
        if (ruta === 'view/') {
            ruta = 'view/index.html';
        }
        serveFile(ruta, respuesta);
    } else if (solicitud.method !== 'GET') {
        // No se permiten solicitudes distintas a GET
        respuesta.writeHead(403);
        respuesta.end('<h1>Error 403: No tiene acceso recurso solicitado</h1>');
    } else if (urlParse.pathname === '/procesar') {
        // Se atienden solicitudes finales (endpoints)
        ruta = 'view/registro.html';
        const parametros = urlParse.query;
        serveFile(ruta, respuesta, parametros);
    } else {
        // Se atienden solicitudes de recursos públicos
        serveFile(ruta, respuesta);
    }
});

const port = 3020;
servidor.listen(port, () => console.log('Servidor web iniciado en el puerto: ' + port));

function serveFile(filePath, response, parametros) {
    filePath = path.join(__dirname, filePath);
    fs.stat(filePath)
        .then(() => {
            return fs.readFile(filePath);
        })
        .then(content => {
            if (filePath.endsWith('registro.html')) {
                content = content.toString()
                    .replace('{{nombres}}', parametros.nombres)
                    .replace('{{apellidos}}', parametros.apellidos)
                    .replace('{{email}}', parametros.email);
            }
            const contentType = getMimeType(filePath) || 'application/octet-stream';
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content);
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

function getExtension(filePath) {
    return filePath.split('.').pop();
}

function getMimeType(filePath) {
    const extension = getExtension(filePath);
    const mimeTypes = {
        'html': 'text/html',
        'css': 'text/css',
        'jpg': 'image/jpeg',
        'ico': 'image/x-icon',
        'mp3': 'audio/mpeg3',
        'mp4': 'video/mp4'
    };

    return mimeTypes[extension];
}
