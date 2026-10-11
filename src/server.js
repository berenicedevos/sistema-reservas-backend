import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { app } from './app.js';
import { envConfig } from './config/env.config.js';
import { connectDB } from './config/database.config.js';
import 'dotenv/config';

const startServer = async () => {
  await connectDB();

  const httpServer = createServer(app);
  const io = new Server(httpServer);

  app.set('io', io);

  io.on('connection', (socket) => {
    console.log('Cliente conectado vía WebSocket');
    socket.on('disconnect', () => {
      console.log('Cliente desconectado de WebSocket');
    });
  });

  httpServer.listen(envConfig.port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${envConfig.port}`);
  });
};

startServer();