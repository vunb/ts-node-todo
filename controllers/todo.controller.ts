import { Request, Response } from 'express';
import { logger } from '../config/logger';
import { todoManager  } from '../models/todo';
import { User } from '../models/user';

export class ToDoController {

  constructor() {}

  async getAll(req: Request, res: Response) {
    try {

      const vUser = req.app.get('user') as User;
      if (!vUser) {
        return res.status(400).send('Not found user');
      }

      logger.info('Get todos by user: ' + vUser.id);
      const result = await todoManager.findAll(vUser.id);
      res.json(result);

    } catch (err) {
      logger.error('Có lỗi xảy ra: ', err);
      res.status(500).send(err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const vUser = req.app.get('user') as User;
      logger.info('Get one: ' + taskId);

      const vUserReulst = await todoManager.findOne(vUser.id, taskId);
      res.json(vUserReulst);

    } catch (err) {
      res.status(500).send(err);
    }
  }

  async create(req: Request, res: Response) {
    try {
      req.checkBody('text', 'Todo description cannot be empty').notEmpty();
      req.checkBody('isDone', 'Todo status cannot be empty').notEmpty();

      const errors = req.validationErrors();
      if (errors) { throw errors; }

      const vUser = req.app.get('user') as User;

      logger.info('Create todo: ' + vUser.id);

      const vUserReulst = await todoManager.create(vUser.id, req.body.text, req.body.isDone);
      res.json(vUserReulst);

    } catch (err) {
      res.status(500).send(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      req.checkParams('id', 'Task id cannot be empty').notEmpty();
      req.checkBody('isDone', 'The password cannot be empty').notEmpty();

      const errors = req.validationErrors();
      if (errors) { throw errors; }

      const taskId = req.params.id as number;
      const vUser = req.app.get('user') as User;

      await todoManager.update(vUser.id, taskId, req.body.text, req.body.isDone);
      res.json({
        message: 'Ok'
      });
    } catch (error) {
      const err: Error = error;
      logger.error('Có lỗi xảy ra: ' + err.message);
      res.status(409).json({
        message: err.message
      });
    }
  }
}

export const toDoCtrl = new ToDoController();
