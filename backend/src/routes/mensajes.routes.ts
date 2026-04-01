import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import { getMensajes, getMensajesNoLeidos } from '../controllers/mensajes.controllers.ts';

const router = Router();

router.use(authMiddleware);

router.get('/', getMensajes); // query: { conversacion_id, limit, cursor }
router.get('/no-leidos', getMensajesNoLeidos); // query: { conversacion_id }

router.post('/', getMensajes); // body: { conversacion_id, contenido, reply_to_id? }
router.post('/:id/leido', getMensajes); // params: { id } → mensaje_id

router.delete('/:id', getMensajes); // params: { id } → mensaje_id

export default router;
