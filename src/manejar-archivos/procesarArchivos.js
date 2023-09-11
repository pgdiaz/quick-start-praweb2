const fs = require('fs')
const readline = require('readline');

const encoding = 'utf-8'

function leer(inputFilePath, callback) {
    fs.readFile(inputFilePath, encoding, callback)
}

function escribir(outputFilePath, contenido, callback) {
    fs.writeFile(outputFilePath, contenido, callback)
}

function modificar(inputFilePath, outputFilePath, callback) {
    leer(inputFilePath, (err, data) => {
        if (err) {
            callback(err)
            return;
        }
        const frases = data.split('\n');
        const frasesCamelCase = frases.map(frase => formatCamelCase(frase));
        escribir(outputFilePath, frasesCamelCase.join('\n'), callback)
    })
}

function agregar(filePath, contenido, callback) {
    fs.writeFile(filePath, contenido, { flag: 'a' }, callback)
}

function eliminar(filePath, callback) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        callback(`El archivo ${filePath} ha sido eliminado.`)
    }
}

function formatCamelCase(frase) {
    return frase.split(' ').map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    }).join('');
}

function buscar(filePath, busqueda, callback) {
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
    });
    const resultados = [];
    resultados.push('ID;Producto;Marca;Unidades;Precio')
    rl.on('line', linea => {
        if (linea.toUpperCase().includes(busqueda.toUpperCase())) {
            resultados.push(linea)
        }
    })
    rl.on('close', () => {
        console.log('Busqueda completada')
        callback(undefined, resultados)
    })
    rl.on('error', error => callback(error))
}

exports.eliminarArchivo = eliminar
exports.escribirArchivo = escribir
exports.modificarArchivo = modificar
exports.agregarcontenidoArchivo = agregar
exports.buscarEnArchivo = buscar
