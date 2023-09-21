// SERVIDOR QUE ENVIA INFORMACION INCRUSTADA COMO RESPUESTA A UN PEDIDO GET
// 1.  REQUERIMOS EL MODULO HTTP
const http = require('http')
// 2. ESTABLECEMOS EL PUERTO
const port = 3000
console.clear()

// 3. CRREAMOS EL SERVER - PROCESAMOS EL PEDIDO Y LA RESPUESTA
const miserver = http.createServer((pedido, respuesta) => {
  // 4. CAPTURAMOS EL RECURSO SOLICITADO
  console.log(pedido)
  const piden = new URL('http://localhost:3000' + pedido.url)
  console.log(piden)
  // 5. DETERMINAMOS QUE MANDATO ES EL QUE ENVIARON
  if (pedido.method == 'GET') {
    if (piden.pathname === '/index.html') { // HTML INSCRUSTADO
      // 6. ESTABLECEMOS LAS CABECERAS DE RESPUESTA
      respuesta.setHeader('Content-Type', 'text/html; charset=utf-8')
      respuesta.writeHead(200, 'Todo ok')
      let salida = '<h1> Bienvenido a Nuestro Sitio Web</h1>'
      salida = salida + '<hr> Has solicitado el recurso: ' + piden.pathname + '<br>'
      respuesta.end(salida)
    } else {
      respuesta.setHeader('Content-Type', 'text/html; charset=utf-8')
      respuesta.writeHead(404, 'Recurso no disponible')
      let salida = '<hr> No se encontró el recurso: ' + piden.pathname + '<br>'
      respuesta.end(salida)
    }
  }
})

miserver.listen(port)
console.log('El servidor esta escuchando en el puerto: ' + port)

// npm install -g nodemon