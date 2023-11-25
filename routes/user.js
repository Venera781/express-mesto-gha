import { Router } from 'express';
import {
  getAllUser,
  getUserId,
  postUser,
  updateUser,
  updateAvatar,
} from '../controllers/user.js';

const router = Router();
router.get('/', getAllUser);
router.get('/:userId', getUserId);
router.post('/', postUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
