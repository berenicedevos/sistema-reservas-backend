# Sistema Backend de Turnos y Reservas

API backend para gestionar servicios y reservas, con arquitectura en capas, persistencia en MongoDB Atlas, validaciones con Zod, vistas con Handlebars y actualización en tiempo real con Socket.io.

## Tecnologías utilizadas

- Node.js (ESM) y Express
- MongoDB Atlas y Mongoose
- Zod (validación de datos)
- Express Handlebars (vistas)
- Socket.io (tiempo real)
- Dotenv (variables de entorno)

## Arquitectura

```
routes → controllers → services → repositories → DAO → models
```

## Instalación

1. Clonar el repositorio.
2. Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar los valores:

```
PORT=8080
APP_NAME=Sistema Backend de Turnos y Reservas
APP_ENV=development
MONGO_URI=tu_uri_de_mongodb_atlas
```

La `MONGO_URI` debe ser la de un cluster propio de MongoDB Atlas, con la IP autorizada en Network Access.

## Ejecución

Desarrollo:

```bash
npm run dev
```

Producción:

```bash
npm start
```

## Endpoints principales

### General

- `GET /api/health`: estado del servidor.

### Servicios (`/api/services`)

- `GET /api/services`: lista con filtros `category` y `available`, paginación con `page` y `limit`, y orden por precio con `sort=asc|desc`.
- `GET /api/services/:sid`: detalle de un servicio.
- `POST /api/services`: crea un servicio.
- `PUT /api/services/:sid`: actualiza un servicio.
- `DELETE /api/services/:sid`: elimina un servicio.

### Reservas (`/api/bookings`)

- `POST /api/bookings`: crea una reserva.
- `GET /api/bookings/:bid`: detalle de la reserva con los servicios completos (`populate`).
- `DELETE /api/bookings/:bid`: elimina una reserva.
- `POST /api/bookings/:bid/services/:sid`: agrega un servicio a la reserva o incrementa su cantidad.
- `PUT /api/bookings/:bid/services/:sid`: modifica la cantidad de un servicio de la reserva.
- `DELETE /api/bookings/:bid/services/:sid`: quita un servicio de la reserva.

## Vistas (Handlebars)

- `/services`: listado de servicios.
- `/realtime-services`: se actualiza sola, vía Socket.io, al crear, modificar o eliminar servicios.
- `/bookings/:bid`: detalle de una reserva con sus servicios.

## Funcionalidades

- CRUD completo de servicios.
- Reservas que guardan solo el `ObjectId` y la `quantity` de cada servicio.
- Consulta de reservas con `populate`.
- Filtros, paginación y ordenamiento en el listado de servicios.
- Validación de datos de entrada con Zod.
- Actualización en tiempo real de la lista de servicios.

## Ejemplos de body

Crear servicio (`POST /api/services`):

```json
{
  "name": "Consulta médica general",
  "description": "Atención primaria e inicial",
  "duration": 30,
  "price": 12000,
  "category": "Salud",
  "available": true
}
```

Crear reserva (`POST /api/bookings`), usando el `_id` de un servicio existente:

```json
{
  "clientName": "Laura",
  "clientEmail": "laura@mail.com",
  "date": "2026-10-20",
  "time": "10:30",
  "services": [
    {
      "service": "ID_DE_UN_SERVICIO_EXISTENTE",
      "quantity": 1
    }
  ]
}
```

Agregar un servicio a una reserva (`POST /api/bookings/:bid/services/:sid`), el body es opcional:

```json
{ "quantity": 2 }
```

Modificar la cantidad (`PUT /api/bookings/:bid/services/:sid`):

```json
{ "quantity": 3 }
```