const http = require('http');
const fs = require('fs');
const path = require('path');

const errorNotFound = 'Recurso no encontrado'
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/public/')) {
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(errorNotFound);
            } else {
                res.writeHead(200, { 'Content-Type': getContentType(req.url) });
                res.end(data);
            }
        });
    } else {
        const viewPath = getRouteView(req.url);
        renderView(res, viewPath);
    }
});

const port = 3020;
server.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});

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

    return path.join(__dirname, `views/${viewName}.html`);
}

function renderView(res, viewPath) {
    const commonSections = loadCommonSections();
    fs.readFile(viewPath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end(errorNotFound);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            data = data.replace('<!-- CommonHeader -->', commonSections.header);
            data = data.replace('<!-- CommonFooter -->', commonSections.footer);
            res.end(data);
        }
    });
}

function loadCommonSections() {
    const header = fs.readFileSync(path.join(__dirname, 'views/common/header.html'), 'utf8');
    const footer = fs.readFileSync(path.join(__dirname, 'views/common/footer.html'), 'utf8');

    return { header, footer };
}

function getContentType(filePath) {
    const extension = filePath.split('.').pop();
    const mimeTypes = {
        'html': 'text/html; charset=utf-8',
        'css': 'text/css',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'svg': 'image/svg+xml',
        'js': 'application/javascript'
    };

    return mimeTypes[extension];
}
