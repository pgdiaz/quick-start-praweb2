const procesarArchivos = require('./procesarArchivos.js')
const readline = require('readline');

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dsProductos = './productos.txt'

const handlerErr = (errMsg, err) => {
    procesarArchivos.agregar(errlog, `${errMsg}: ${err}\n`, () => console.log(errMsg))
}

var dsDatosIniciales = '001;Azúcar;Ledesma;250 un.;$ 780\n' +
    '002;Yerba;Mañanita;128 un.;$ 1360\n' +
    '003;Tomates;Arcor;325 un.;$ 360\n' +
    '004;Leche UAT;Milkaut;85 un.;$ 360\n' +
    '005;Mermelada;Arcor;45 un.;$ 480'
procesarArchivos.escribirArchivo(dsProductos, dsDatosIniciales, error => {
    if (error) {
        handlerErr('Ocurrió un error al iniciar el archivo de datos', error)
        return;
    }
    console.log('Se generó el archivo de datos')
    terminal.question('Ingresa la palabra clave que deseas buscar: ', busqueda => {
        procesarArchivos.buscarEnArchivo(dsProductos, busqueda, (error, resultados) => {
            if (error) {
                handlerErr('Ocurrió un error en la búsqueda', error)
                terminal.close();
                return;
            }
            console.log('Resultados:')
            resultados.forEach(element => {
                console.log(`| ${element.replace(/;/g, ' | ')} |`)
            });
            terminal.close();
        })
    });
})
