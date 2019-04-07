import { Router } from 'express';
import { authCtrl } from '../controllers/auth.controller';

export function authRouter() {
  const router = Router();

  router.post('/login', authCtrl.login.bind(authCtrl));
  return router;
}
