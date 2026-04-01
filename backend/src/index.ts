import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { PORT } from './config.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

import userRoutes from './routes/user.routes.ts';
import authRoutes from './routes/auth.routes.ts';
import solicitudRoutes from './routes/solicitud.routes.ts';
import mensajesRoutes from './routes/mensajes.routes.ts';

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: { origin: '*' },
});

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // PARSEAR DATA HTML FORM SUBMITION EN EL REQUEST BODY

// ROUTES
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/solicitudes', solicitudRoutes);
app.use('/mensajes', mensajesRoutes);

// MIDDLEWARES
app.use(errorHandler);

// SOCKET
import { setupSockets } from './sockets/index.socket.ts';
setupSockets(io);

// app.listen(PORT); // ESCUCHAMOS LA APP DE EXPRESS
server.listen(PORT); // ESCUCHAMOS EL SERVER DE SOCKET IO
console.log('Server on port', PORT);
