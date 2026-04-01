import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import {
  aceptarSolicitud,
  enviarSolicitud,
  rechazarSolicitud,
  getSolicitudesEnviadas,
  getSolicitudesRecibidas,
  cancelarSolicitud,
} from '../controllers/solicitud.controllers.ts';

const router = Router();

router.use(authMiddleware);

router.get('/enviadas', getSolicitudesEnviadas);
router.get('/recibidas', getSolicitudesRecibidas);

router.post('/', enviarSolicitud);

router.patch('/:id/aceptar', aceptarSolicitud);
router.patch('/:id/rechazar', rechazarSolicitud);

router.delete('/:id', cancelarSolicitud);

export default router;
