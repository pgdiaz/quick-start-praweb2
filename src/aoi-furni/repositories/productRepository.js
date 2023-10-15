const products = {
    '1': {
        'id': 1,
        'type': 'Butaca',
        'style': 'Nordic',
        'imgpath': '../public/images/catalog/product-1.png',
        'detail': 'Un diseño para el confort. Esta butaca está construida con maderas estacionadas, cinchas y resortes, garantiza su durabilidad y resistencia. Cuenta con una placa de supersoft de densidad variable que se adapta al confort de cada persona.  Las patas son de madera maciza, aportan calidez al diseño. En cuanto a los materiales de tapizado, son a elección del cliente, permitiendo seleccionar tejidos y tonos para  personalizarla según su estilo y decoración.'
    },
    '2': {
        'id': 2,
        'type': 'Silla',
        'style': 'Ergonomic',
        'imgpath': '../public/images/catalog/product-2.png',
        'detail': 'Es la perfecta combinación entre elegancia y comodidad, diseñada para realzar cualquier espacio. Cada silla se fabrica exclusivamente para cada cliente, lo que te permite personalizar seleccionando el color y el género que mejor se ajusten a tus preferencias. Además, puedes elegir el color de las patas para adaptarlas a la estética de tu hogar o espacio. La estructura de la silla está fabricada con madera de guindo maciza lustrada, lo que garantiza su durabilidad y belleza a lo largo del tiempo. El asiento de la silla ha sido cuidadosamente diseñado para ofrecer una comodidad excepcional. Cuenta con una placa de supersoft y un relleno de vellón siliconado envuelto en guata, proporcionando una sensación de suavidad y confort al sentarse. Ya sea en tu comedor, sala de estar o cualquier otro ambiente, estas sillas añadirán un toque de distinción a tu espacio. Su diseño elegante y personalizado se adapta a diferentes estilos de decoración, aportando sofisticación y calidez.'
    },
    '3': {
        'id': 3,
        'type': 'Butaca',
        'style': 'Kruzo Aero',
        'imgpath': '../public/images/catalog/product-3.png',
        'detail': 'Un diseño moderno de alto confort, esta butaca está construida con maderas estacionadas, cinchas y resortes, garantiza su durabilidad y resistencia. Cuenta con una placa de supersoft de densidad variable que se adapta al confort de cada persona. Los almohadones están rellenos de vellón siliconado y envueltos en guata con funda.En cuanto a la base se desarrolla un zócalo de madera rehundido, garantiza la estabilidad y brinda una apariencia sobria y robusta.Los tejidos son a elección del cliente, contamos con variedad de telas para complementar con el diseño y estética de cualquier ambiente.'
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
