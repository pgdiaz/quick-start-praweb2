const procesarArchivos = require('./procesarArchivos.js')

const errlog = './errlog.txt'
const dsDatos = './datos.txt'
const dsDatosModificados = './datos_modificados.txt'
// const dsProductos = './productos.txt'

const handlerErr = (errMsg, err) => {
    procesarArchivos.agregar(errlog, `${errMsg}: ${err}\n`, () => console.log(errMsg))
}

var dsDatosTest = 'esto es una prueba\nhola mundo\ncomo hacer camel case'
procesarArchivos.escribirArchivo(dsDatos, dsDatosTest, error => {
    if (error) {
        handlerErr('Ocurrió un error al iniciar el archivo de datos', error)
        return;
    }
    console.log('Se generó el archivo de datos')
    procesarArchivos.eliminarArchivo(dsDatosModificados, outMsg => console.log(outMsg))
    procesarArchivos.modificarArchivo(dsDatos, dsDatosModificados, error => {
        if (error) {
            handlerErr('Ocurrió un error al modificar el archivo', error)
            return;
        }
        console.log('Se generó el archivo modificado')
        procesarArchivos.agregarcontenidoArchivo(dsDatosModificados, '\nnuevaLineaAgregadaOK', error => {
            error ? handlerErr('Ocurrió un error al actualizar el archivo', error) : console.log('Se actualizó el archivo')
        })
    })
})
