const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3020;

// requerimos el router de contactos
const contactosRouter = require('./rutas/contactosRouter');

// requerimos el módulo cors para permitir accesos de cualquier origen
app.use(cors());

app.use('/api/1.0/contactos', contactosRouter);

app.listen(PORT, console.log('Express está escuchando en el puerto: ' + PORT));
