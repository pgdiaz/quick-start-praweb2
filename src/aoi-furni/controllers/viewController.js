const fs = require('fs');
const router = require('../routers/viewRouter.js');
const adapter = require('../repositories/viewAdapter.js')
const mapper = require('../mappers/viewMapper.js')
const mimeType = require('../helpers/mimeTypeHelper.js')
const encoding = 'utf8';

exports.getView = get;

function get(request, response) {
    const viewRoute = router.getViewRoute(request);
    const model = adapter.getModel(viewRoute.name, viewRoute.params);
    renderView(response, viewRoute.locations, model);
}

function renderView(response, viewpaths, model) {
    fs.readFile(viewpaths.main, encoding, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                response.writeHead(404, { 'Content-Type': mimeType.getTextPlain() });
                response.end('Recurso no encontrado');
            } else {
                response.writeHead(500, { 'Content-Type': mimeType.getTextPlain() });
                response.end('Error interno del servidor');
            }
        } else {
            const commonSections = loadCommonSections();
            response.writeHead(200, { 'Content-Type': mimeType.getTextHtml() });
            content = mapper.mapCommonPartialViews(content, commonSections);
            if (viewpaths.hasOwnProperty('partial')) {
                content = mapper.mapView(content, model, () => {
                    return fs.readFileSync(viewpaths.partial, encoding);
                });
            } else {
                content = mapper.mapView(content, model);
            }
            response.end(content);
        }
    });
}

function loadCommonSections() {
    const header = fs.readFileSync(router.getHeaderRoute().location, encoding);
    const footer = fs.readFileSync(router.getFooterRoute().location, encoding);

    return { header, footer };
}
