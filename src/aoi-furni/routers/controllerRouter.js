const resourceController = require('../controllers/resourceController.js');
const viewController = require('../controllers/viewController.js');
const mimeType = require('../helpers/mimeTypeHelper.js')

exports.route = route;

function route(request, response) {
    if (request.url.startsWith('/public/')) {
        if (request.method === 'GET') {
            resourceController.getResource(request, response);
        } else {
            response.writeHead(405, { 'Content-Type': mimeType.getTextPlain() });
            response.end('Método no permitido');
        }
    } else {
        if (request.method === 'GET') {
            viewController.getView(request, response);
        } else {
            response.writeHead(405, { 'Content-Type': mimeType.getTextPlain() });
            response.end('Método no permitido');
        }
    }
}
