import { Router } from 'express';
import { toDoCtrl } from '../controllers/todo.controller';

export function todoRouter() {
  const router = Router();

  router.get('/', toDoCtrl.getAll);
  router.get('/:id', toDoCtrl.getOne);
  router.post('/', toDoCtrl.create);

  return router;
}
