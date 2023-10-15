const products = {
    '1': {
        'id': 1,
        'type': 'Silla',
        'style': 'Nordic',
        'detail': 'Un diseño clásico y elegante.'
    },
    '4': {
        'id': 4,
        'type': 'Butaca',
        'style': 'Rattano',
        'detail': 'Un diseño clásico y elegante. Está construido con una estructura de maderas estacionadas, lo que garantiza su durabilidad y resistencia. Además, cuenta con cinchas y resortes que brindan soporte adicional. El relleno de la banqueta está compuesto por una placa de supersoft de densidad variable, lo que significa que se adapta al confort personal. El almohadón está relleno de vellón siliconado, que ofrece una sensación suave y cómoda. Las patas en acero satinado o hierro tono a elección, garantiza la estabilidad y brinda una apariencia sobria y liviana. El diseño se caracteriza por su terminación capitoné en el respaldo, agrega un toque de sofisticación y elegancia a cualquier espacio. Los tejidos son a elección del cliente, contamos con variedad de telas para complementar con el diseño y estética del ambiente.'
    }
};
let id = 4;
let model = getProductModel({ id });
printProduct(model);
model = getProductsModel();
model.forEach(item => {
    printProduct(item);
});

function getProductModel(dto) {
    return products[dto.id];
}

function getProductsModel() {
    return Object.values(products);
}

function printProduct(model) {
    console.log('ID: ' + model.id);
    console.log('Type: ' + model.type);
    console.log('Style: ' + model.style);
    console.log('Detail: ' + model.detail);
}
