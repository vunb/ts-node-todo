import {Express, NextFunction, Request, Response} from 'express';
import { logger } from '../config/logger';
import { authenticate, initialize } from '../config/passport';
import { User } from '../models/user';
import { authRouter } from './auth.router';
import { todoRouter } from './todo.router';
import { userRouter } from './user.router';

export function routes(app: Express) {

  /**
   * Config passport
   */
  app.use(initialize());

  app.use((req, res, next) => {
    if (req.path.includes('login')) {
      return next();
    }

    return authenticate((err, user: User, info: any) => {
      if (err) { return next(err); }
      if (!user) {
          if (info.name === 'TokenExpiredError') {
              return res.status(401).json({ message: 'Your token has expired. Please generate a new one' });
          } else {
              return res.status(401).json({ message: info.message });
          }
      }
      app.set('user', user);
      return next();
    })(req, res, next);
  });

  app.get('/', (req, res) => res.send('Ok'));

  /**
   * Định tuyến các api controller
   */
  app.use('/auth', authRouter());
  app.use('/user', userRouter());
  app.use('/todo', todoRouter());

  // If no route is matched by now, it must be a 404
  app.use((req, res, next) => {
    res.status(404).json({
      error: 'Data not found'
    });
    next();
  });

  // Handle application error
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('We got an error! -> ', error);

    if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({
          error: 'Unexpected error: ' + error
        });
    }
    next(error);
  });
}
