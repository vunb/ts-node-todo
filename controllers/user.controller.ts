import { userManager  } from "../models/user";
import { logger } from "../config/logger";
import { Request, Response } from 'express';

export class UserController {


  constructor() {
    // this.userManager = new UserManager();
  }

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
      let userName = req.params.id;
      logger.info('Get one: ' + userName);

      const vUserReulst = await userManager.findByUserName(userName);
      res.json(vUserReulst);

    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export const userCtrl = new UserController();
