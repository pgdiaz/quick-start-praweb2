const products = {
    '1': {
        'id': 1,
        'type': 'Silla',
        'style': 'Nordic',
        'imgpath': '../public/images/catalog/product-1.png',
        'detail': ''
    },
    '2': {
        'id': 2,
        'type': 'Silla',
        'style': 'Ergonomic',
        'imgpath': '../public/images/catalog/product-2.png',
        'detail': ''
    },
    '3': {
        'id': 3,
        'type': 'Silla',
        'style': 'Kruzo Aero',
        'imgpath': '../public/images/catalog/product-3.png',
        'detail': ''
    },
    '4': {
        'id': 4,
        'type': 'Butaca',
        'style': 'Rattano',
        'imgpath': '../public/images/catalog/product-4.png',
        'detail': 'Un diseño clásico y elegante. Está construido con una estructura de maderas estacionadas, lo que garantiza su durabilidad y resistencia. Además, cuenta con cinchas y resortes que brindan soporte adicional. El relleno de la banqueta está compuesto por una placa de supersoft de densidad variable, lo que significa que se adapta al confort personal. El almohadón está relleno de vellón siliconado, que ofrece una sensación suave y cómoda. Las patas en acero satinado o hierro tono a elección, garantiza la estabilidad y brinda una apariencia sobria y liviana. El diseño se caracteriza por su terminación capitoné en el respaldo, agrega un toque de sofisticación y elegancia a cualquier espacio. Los tejidos son a elección del cliente, contamos con variedad de telas para complementar con el diseño y estética del ambiente.'
    }
};

exports.getProductById = getById;
exports.getAll = getAll;

function getById(id) {
    return products[id];
}

function getAll() {
    return Object.values(products);
}
