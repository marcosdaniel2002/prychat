import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import {
  aceptarSolicitud,
  enviarSolicitud,
  rechazarSolicitud,
  getSolicitudesEnviadas,
  getSolicitudesRecibidas,
  cancelarSolicitud,
  countSolicitudesPendientes,
} from '../controllers/solicitud.controllers.ts';

const router = Router();

router.use(authMiddleware);

router.get('/enviadas', getSolicitudesEnviadas);
router.get('/recibidas', getSolicitudesRecibidas);
router.get('/recibidas/count', countSolicitudesPendientes);

router.post('/', enviarSolicitud);

router.patch('/:id/aceptar', aceptarSolicitud);
router.patch('/:id/rechazar', rechazarSolicitud);

router.delete('/:id', cancelarSolicitud);

export default router;
