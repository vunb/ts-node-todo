import {get as getConfig, has} from 'config';
import { Request, Response } from 'express';
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { userManager, User } from '../models/user';
import { logger } from './logger';

/**
 * Secret key
 */
const JWT_SECRET: string = process.env.JWT_SECRET || getConfig('auth.JWT_SECRET');

export function getStrategy(): Strategy {
  const params = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
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
        // logger.info('Found user: ' + vUser.username);
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

export function getToken(user: User): object {
  const expires = moment.utc().add({
      days: 7
    })
    .unix();

  const token = jwt.encode({
      exp: expires,
      id: user.id,
      username: user.username
    }, JWT_SECRET);
  return {
    token: 'JWT ' + token,
    expires: moment.unix(expires).format(),
    user: user.id
  };
}

export function initialize() {
  passport.use('jwt', getStrategy());
  return passport.initialize();
}

export function authenticate(callback: (...args: any[]) => any) {
  return passport.authenticate('jwt', {
    failWithError: true,
    session: false
  }, callback);
}
