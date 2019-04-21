import { Request, Response } from 'express';
import { logger } from '../config/logger';
import { getToken } from '../config/passport';
import { userManager, User } from '../models/user';

/**
 * Controller sử dụng cho việc xác thực Jwt
 * - JWT_SECRET recommend to use all kinds of characters and to have the length of at least 25
 * - It’s very important not to repeat this hash among your projects, as it has to be something unique
 * and secure, because this is what is used for generating and comparing the token
 * Ref: https://www.lastpass.com/password-generator
 */
export class AuthController {
  constructor() {

  }

  async login(req: Request, res: Response) {
    try {
      req.checkBody('username', 'Invalid username').notEmpty();
      req.checkBody('password', 'Invalid password').notEmpty();

      const errors = req.validationErrors();
      if (errors) {
        throw errors;
      }

      logger.info('Kiểm tra đăng nhập tài khoản: ' + req.body.username);

      const vUser = await userManager.verifyUsernameAndPassword(
        req.body.username,
        req.body.password
      );

      const token = getToken(vUser);
      res.json(token);

    } catch (err) {
      logger.error('Lỗi kiểm tra xác thực: ' + err);
      res.status(401).json({
        message: 'Invalid credentials',
        errors: err
      });
    }
  }

}

export const authCtrl = new AuthController();
