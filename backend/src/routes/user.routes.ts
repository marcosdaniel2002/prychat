import { Router } from 'express';
// CONTROLLER
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getPotentialFriends,
} from '../controllers/user.controllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/potential-friends', authMiddleware, getPotentialFriends);

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
