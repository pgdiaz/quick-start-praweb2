const http = require('http');
const router = require('./routers/controllerRouter')

const server = http.createServer((request, response) => {
    router.route(request, response);
});

const port = 3020;
server.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});
