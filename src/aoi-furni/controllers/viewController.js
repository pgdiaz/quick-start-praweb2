const fs = require('fs');
const path = require('path');

exports.getView = get;

function get(req, res) {
    const viewPath = getRouteView(req.url);
    renderView(res, viewPath);
}

function getRouteView(url) {
    let viewName = '';
    switch (url) {
        case '/':
        case '/index':
        case '/index.html':
            viewName = 'index';
            break;
        case '/catalog':
        case '/catalog.html':
            viewName = 'catalog';
            break;
        case '/contact':
        case '/contact.html':
            viewName = 'contact';
            break;
        case '/about':
        case '/about.html':
            viewName = 'about';
            break;
        default:
            viewName = 'error/notfound';
    }

    return path.join(__dirname, `../views/${viewName}.html`);
}

function renderView(res, viewPath) {
    const commonSections = loadCommonSections();
    fs.readFile(viewPath, 'utf8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Recurso no encontrado');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Error interno del servidor');
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            content = content.replace('<!-- CommonHeader -->', commonSections.header);
            content = content.replace('<!-- CommonFooter -->', commonSections.footer);
            res.end(content);
        }
    });
}

function loadCommonSections() {
    const header = fs.readFileSync(path.join(__dirname, '../views/common/header.html'), 'utf8');
    const footer = fs.readFileSync(path.join(__dirname, '../views/common/footer.html'), 'utf8');

    return { header, footer };
}
