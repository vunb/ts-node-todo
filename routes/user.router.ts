import { Router } from 'express';
import { userCtrl } from '../controllers/user.controller';

export function userRouter() {
  const router = Router();

  router.get('/', userCtrl.getAll);
  router.get('/:id', userCtrl.getOne);
  router.post('/', userCtrl.createUser);

  return router;
}
