import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import path from 'path';

import { PORT } from './config.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import { multerMiddleware } from './middlewares/multerMiddleware.ts';
import { setupSockets } from './sockets/index.socket.ts';

import userRoutes from './routes/user.routes.ts';
import authRoutes from './routes/auth.routes.ts';
import solicitudRoutes from './routes/solicitud.routes.ts';
import mensajesRoutes from './routes/mensajes.routes.ts';
import { cleanupFiles } from './middlewares/cleanFilesMiddleware.ts';

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// MIDDLEWARES
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
// app.use(multerMiddleware); // multipart/form-data

// STATIC FILES
app.use('/media', express.static(path.join(process.cwd(), 'media')));

// ROUTES
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/solicitudes', solicitudRoutes);
app.use('/mensajes', mensajesRoutes);

// MIDDLEWARES
app.use(cleanupFiles);
app.use(errorHandler);

// SOCKET
setupSockets(io);

// app.listen(PORT); // ESCUCHAMOS LA APP DE EXPRESS
server.listen(PORT); // ESCUCHAMOS EL SERVER DE SOCKET IO
console.log('Server on port', PORT);
