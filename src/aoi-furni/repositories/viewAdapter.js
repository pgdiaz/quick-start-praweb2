const productRepository = require('./productRepository.js');

exports.getModel = getModel;

function getModel(viewname, dto) {
    let name = viewname;
    let attributes = dto;
    switch (viewname) {
        case 'product':
            if (Object.keys(dto).length !== 0) {
                attributes = productRepository.getProductById(dto.id);
            }
            return { name, attributes };
        case 'catalog':
            attributes = productRepository.getAll();
            return { name, attributes };
        default:
            return { name, attributes };
    }
}
