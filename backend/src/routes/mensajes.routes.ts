import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import {
  eliminarMensaje,
  enviarMensaje,
  getMensajes,
  getMensajesNoLeidos,
  marcarLeido,
  marcarLeidoConversacion,
} from '../controllers/mensajes.controllers.ts';

const router = Router();

router.use(authMiddleware);

router.get('/', getMensajes); // query: { conversacion_id, limit, cursor }
router.get('/no-leidos', getMensajesNoLeidos); // query: { conversacion_id }

router.post('/', enviarMensaje); // body: { conversacion_id, contenido, reply_to_id? }
router.post('/leer-conversacion', marcarLeidoConversacion); // body: { conversacion_id }
router.post('/:id/leido', marcarLeido); // params: { id } → mensaje_id

router.delete('/:id', eliminarMensaje); // params: { id } → mensaje_id

export default router;
