exports.getFrom = getFrom;
exports.getTextPlain = getTextPlain;
exports.getTextHtml = getTextHtml;

function getFrom(url) {
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

function getTextPlain() {
    return 'text/plain; charset=utf-8';
}

function getTextHtml() {
    return 'text/html; charset=utf-8';
}
