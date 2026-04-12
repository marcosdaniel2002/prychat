import { Router } from 'express';
import {
  register,
  login,
  logout,
  me,
  updateAvatar,
  updatePassword,
  updateProfile,
} from '../controllers/auth.controllers.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import { multerMiddleware, uploadFields } from '../middlewares/multerMiddleware.ts';

const router = Router();

router.post('/register', multerMiddleware, register);
router.post('/login', multerMiddleware, login);
router.post('/logout', logout);
router.get('/me', me);

router.patch('/update/password', authMiddleware, multerMiddleware, updatePassword);
router.patch('/update/profile', authMiddleware, multerMiddleware, updateProfile);
router.patch(
  '/update/avatar',
  authMiddleware,
  uploadFields([{ fieldName: 'imagen', ruta_save: '/usuarios/avatars' }]),
  updateAvatar
);

export default router;
