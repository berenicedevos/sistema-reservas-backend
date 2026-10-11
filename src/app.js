import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { engine } from 'express-handlebars';
import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';
import viewsRouter from './routes/views.router.js';
import { sendError } from './utils/http-error.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Servidor funcionando' });
});

app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/', viewsRouter);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
  sendError(res, error);
});