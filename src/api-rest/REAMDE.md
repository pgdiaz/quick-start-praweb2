# API de Catálogo de Muebles de Interior

Esta es una API REST simple para gestionar un catálogo de muebles de interior.

## Tecnologías Principales

- Node.js
- Express.js
- SQLite (base de datos en memoria)
- Swagger (OpenAPI 3)

## Pasos para Correr la Aplicación en Local

1. Clona el repositorio desde [GitHub](https://github.com/tu-usuario/tu-repo).
2. Asegúrate de tener Node.js instalado en tu sistema.
3. Ejecuta `npm install` para instalar las dependencias.
4. Ejecuta `npm start` para iniciar la aplicación.
5. La documentación de la API estará disponible en [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
6. Puedes probar la API utilizando una herramienta como [Postman](https://www.postman.com/).

## Requisitos

- Node.js

## Endpoints Disponibles

- `GET /productos` - Obtener todos los productos
- `GET /productos/{id}` - Obtener un producto por ID
- `POST /productos` - Agregar un nuevo producto
- `PUT /productos/{id}` - Actualizar un producto por ID
- `DELETE /productos/{id}` - Eliminar un producto por ID

## Licencia

Este proyecto se encuentra bajo la Licencia MIT.
