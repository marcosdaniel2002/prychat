import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import {
  getConversaciones,
  getConversacion,
  crearConversacion,
  agregarMiembro,
  cambiarRol,
  eliminarConversacion,
  removerMiembro,
} from '../controllers/conversacion.controllers.ts';

const router = Router();

router.use(authMiddleware);

router.get('/', getConversaciones);
router.get('/:id', getConversacion); // Solo info y miembros — se llama UNA vez al abrir el chat

router.post('/', crearConversacion); // SOLO CUANDO ES CONVERSACION EN GRUPO
router.post('/:id/miembros', agregarMiembro); // SOLO ADMIN PUEDE AGREGAR ADEMAS TIENE QUE SER UN GRUPO

router.patch('/:id/miembros/:usuarioId', cambiarRol);

router.delete('/:id/miembros/:usuarioId', removerMiembro);
router.delete('/:id', eliminarConversacion);

export default router;
