import { any } from 'bluebird';
import * as config from 'config';
import { Request } from 'express';
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import * as passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { userManager, User } from '../models/user';

/**
 * Controller sử dụng cho việc xác thực Jwt
 * - JWT_SECRET recommend to use all kinds of characters and to have the length of at least 25
 * - It’s very important not to repeat this hash among your projects, as it has to be something unique
 * and secure, because this is what is used for generating and comparing the token
 * Ref: https://www.lastpass.com/password-generator
 */
class AuthController {
  constructor() {

  }

  private getStrategy(): Strategy {
    const params = {
      secretOrKey: process.env.JWT_SECRET || config.get('auth.JWT_SECRET'),
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

  public initialize() {
    passport.use('jwt', this.getStrategy());
  }

}
