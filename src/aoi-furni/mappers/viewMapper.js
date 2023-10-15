exports.mapCommonPartialViews = mapCommon;
exports.mapView = map;

function mapCommon(content, sections) {
    return content
        .replace('<!-- CommonHeader -->', sections.header)
        .replace('<!-- CommonFooter -->', sections.footer);
}

function map(content, model, callbackfn) {
    if (Object.keys(model.attributes).length === 0) {
        return content;
    }
    switch (model.name) {
        case 'registration':
            return mapRegistrationView(content, model.attributes);
        case 'product':
            return mapProductView(content, model.attributes);
        case 'catalog':
            return mapCatalogView(content, model.attributes, callbackfn);
        default:
            return content;
    }
}

function mapRegistrationView(content, attributes) {
    return content.replace('{{names}}', attributes.names)
        .replace('{{lastnames}}', attributes.lastnames)
        .replace('{{email}}', attributes.email);
}

function mapProductView(content, attributes) {
    return content.replace('{{product-id}}', attributes.id)
        .replace('{{product-type}}', attributes.type)
        .replace('{{product-style}}', attributes.style)
        .replace('{{product-detail}}', attributes.detail)
        .replace('{{product-img-src}}', attributes.imgpath);
}

function mapCatalogView(content, attributes, callbackfn) {
    const partials = attributes.map(product => callbackfn()
        .replace('{{product-id}}', product.id)
        .replace('{{product-type}}', product.type)
        .replace('{{product-style}}', product.style)
        .replace('{{product-img-src}}', product.imgpath))
        .join('');

    return content.replace('{{catalog-products}}', partials);
}
