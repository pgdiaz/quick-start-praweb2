const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3020;

// Base de datos en memoria
const db = new sqlite3.Database(':memory:');

// Crear una tabla de productos
db.serialize(function () {
    db.run("CREATE TABLE productos (id INT PRIMARY KEY, nombre TEXT, descripcion TEXT, precio REAL)");
});

// Cargar datos iniciales para pruebas
db.serialize(function () {
    const stmt = db.prepare("INSERT INTO productos VALUES (?, ?, ?, ?)");
    stmt.run(1, 'Sofá', 'Un cómodo sofá para tu sala de estar.', 499.99);
    stmt.run(2, 'Mesa de Comedor', 'Una elegante mesa de comedor de madera.', 299.99);
    stmt.finalize();
});

// Swagger Options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de catálogo de muebles de interior',
            version: '1.0.0',
            description: 'Una API para gestionar un catálogo de muebles de interior.'
        },
        servers: [
            {
                url: 'http://localhost:3020',
                description: 'Development server',
            },
        ],
    },
    // TODO: Si iniciamos la app con el debugger de VC, no reconoce el path de apis y por lo tanto no levanta los endpoints
    apis: ['./src/api-rest/app.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
app.get('/productos', (req, res) => {
    db.all("SELECT * FROM productos", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del producto
 */
app.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM productos WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.json(row);
    });
});

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Agregar un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 */
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const stmt = db.prepare("INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)");
    stmt.run(nombre, descripcion, precio, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Producto creado con éxito' });
    });
    stmt.finalize();
});

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 */
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio } = req.body;
    const stmt = db.prepare("UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?");
    stmt.run(nombre, descripcion, precio, id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Producto actualizado con éxito' });
    });
    stmt.finalize();
});

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Producto eliminado con éxito
 */
app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    const stmt = db.prepare("DELETE FROM productos WHERE id = ?");
    stmt.run(id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(204).end();
    });
    stmt.finalize();
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
