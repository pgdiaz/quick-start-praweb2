const path = require('path');
const url = require('url');

exports.getViewRoute = getViewRoute;
exports.getHeaderRoute = getHeaderRoute;
exports.getFooterRoute = getFooterRoute;

function getViewRoute(request) {
    const parsedUrl = url.parse(request.url, true);
    let params = parsedUrl.query;
    let name = '';
    let locations = {};
    switch (parsedUrl.pathname) {
        case '/':
        case '/index':
        case '/index.html':
            name = 'index';
            break;
        case '/catalog':
        case '/catalog.html':
            name = 'catalog';
            locations['partial'] = path.join(__dirname, `../views/partial/product-catalog.html`);
            break;
        case '/contact':
        case '/contact.html':
            name = 'contact';
            break;
        case '/about':
        case '/about.html':
            name = 'about';
            break;
        case '/process':
        case '/process.html':
            name = 'registration';
            break;
        case '/product':
        case '/product.html':
            name = 'product';
            break;
        default:
            name = 'error/notfound';
    }
    locations['main'] = path.join(__dirname, `../views/${name}.html`);

    return { name, locations, params };
}

function getHeaderRoute() {
    let name = 'header';
    let location = path.join(__dirname, '../views/common/header.html');

    return { name, location };
}

function getFooterRoute() {
    let name = 'footer';
    let location = path.join(__dirname, '../views/common/footer.html');

    return { name, location };
}
