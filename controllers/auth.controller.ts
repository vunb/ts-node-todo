import { any } from 'bluebird';
import * as config from 'config';
import { Request, Response } from 'express';
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import * as passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { userManager, User } from '../models/user';

/**
 * Secret key
 */
const JWT_SECRET: string = process.env.JWT_SECRET || config.get('auth.JWT_SECRET');

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

  private getStrategy(): Strategy {
    const params = {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      passReqToCallback: true
    };

    return new Strategy(params, async (req: Request, payload: any, done: VerifiedCallback) => {
      try {
        const username = payload.username;
        const vUser = await userManager.findByUserName(username);

        if (vUser == null) {
          return done(null, false, {
            message: `Không tồn tại user ${username}`
          });
        } else {
          return done(null, {
            id: vUser.id,
            username: vUser.username
          });
        }

      } catch (err) {
          done(err);
      }
    });

  }

  private getToken(user: User) {
    const expires = moment.utc().add({
        days: 7
      })
      .unix();

    const token = jwt.encode({
        exp: expires,
        username: user.username
      }, JWT_SECRET);
  }

  public initialize() {
    passport.use('jwt', this.getStrategy());
    return passport.initialize();
  }

  public authenticate(callback: (...args: any[]) => any) {
    return passport.authenticate('jwt', {
      failWithError: true,
      session: false
    }, callback);
  }

  async login(req: Request, res: Response) {
    try {
      req.checkBody('username', 'Invalid username').notEmpty();
      req.checkBody('password', 'Invalid password').notEmpty();

      const errors = req.validationErrors();
      if (errors) {
        throw errors;
      }

      const vUser = await userManager.verifyUsernameAndPassword(
        req.body.username,
        req.body.password
      );

      const token = this.getToken(vUser);
      res.json(token);

    } catch (err) {
      res.status(401).json({
        message: 'Invalid credentials',
        errors: err
      });
    }
  }

}

export const authCtrl = new AuthController();
