const http = require('http')
const port = 3000
const servidor = http.createServer((pedido, respuesta) => {
    console.log('Metodo: ' + pedido.method)
    if (pedido.method === 'GET') {
        respuesta.writeHead(200, { 'Content-Type': 'text/html' })
        respuesta.write(`<!doctype html><html><head></head><body><h1>Sitio en desarrollo</h1></body></html>`)
        respuesta.end()
    }
})
servidor.listen(port, () => console.log('Escuchando en el puerto ' + port))
console.log('Servidor web iniciado')