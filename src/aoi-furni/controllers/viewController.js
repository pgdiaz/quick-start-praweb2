const fs = require('fs');
const router = require('../routers/viewRouter.js');
const mimeType = require('../helpers/mimeTypeHelper.js')
const encoding = 'utf8';

exports.getView = get;

function get(request, response) {
    const route = router.getViewRoute(request);
    renderView(response, route);
}

function renderView(response, route) {
    const commonSections = loadCommonSections();
    fs.readFile(route.location, encoding, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                response.writeHead(404, { 'Content-Type': mimeType.getTextPlain() });
                response.end('Recurso no encontrado');
            } else {
                response.writeHead(500, { 'Content-Type': mimeType.getTextPlain() });
                response.end('Error interno del servidor');
            }
        } else {
            response.writeHead(200, { 'Content-Type': mimeType.getTextHtml() });
            content = content
                .replace('<!-- CommonHeader -->', commonSections.header)
                .replace('<!-- CommonFooter -->', commonSections.footer);
            content = mapParams(route, content);
            response.end(content);
        }
    });
}

function mapParams(route, content) {
    if (Object.keys(route.params).length > 0 && route.name === 'registration') {
        return content.replace('{{names}}', route.params.names)
            .replace('{{lastnames}}', route.params.lastnames)
            .replace('{{email}}', route.params.email);
    }

    return content;
}

function loadCommonSections() {
    const header = fs.readFileSync(router.getHeaderRoute().location, encoding);
    const footer = fs.readFileSync(router.getFooterRoute().location, encoding);

    return { header, footer };
}
