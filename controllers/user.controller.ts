import { Request, Response } from 'express';
import { logger } from '../config/logger';
import { userManager  } from '../models/user';

export class UserController {

  constructor() {}

  async getAll(req: Request, res: Response) {
    try {

      logger.info('Get all users ...');
      const result = await userManager.findAll();
      res.json(result);

    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const userName = req.params.id;
      logger.info('Get one: ' + userName);

      const vUserReulst = await userManager.findByUserName(userName);
      res.json(vUserReulst);

    } catch (err) {
      res.status(500).send(err);
    }
  }

  async createUser(req: Request, res: Response) {
    req.checkBody('username', 'The username cannot be empty').notEmpty();
    req.checkBody('password', 'The password cannot be empty').notEmpty();

    const errors = req.validationErrors();
    if (errors) { throw errors; }

    await userManager.createUser(req.body.username, req.body.password);
    res.json({
      message: 'Ok'
    });
  }
}

export const userCtrl = new UserController();
