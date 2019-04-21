import { Router } from 'express';
import { toDoCtrl } from '../controllers/todo.controller';

export function todoRouter() {
  const router = Router();

  // GET http://localhost:300/todo
  router.get('/', toDoCtrl.getAll);

  // GET http://localhost:300/todo/3
  router.get('/:id', toDoCtrl.getOne);

  // POST http://localhost:300/todo
  router.post('/', toDoCtrl.create);

  return router;
}
