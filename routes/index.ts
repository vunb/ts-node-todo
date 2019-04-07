import {Express, NextFunction, Request, Response} from 'express';
import { db } from '../config/knex';
import { logger } from '../config/logger';
import { authRouter } from './auth.router';
import { userRouter } from './user.router';

export function routes(app: Express) {
  app.get('/', (req, res) => res.send('Ok'));

  /**
   * Định tuyến các controller
   */
  app.use('/user', userRouter());
  app.use('/auth', authRouter());

  // If no route is matched by now, it must be a 404
  app.use((req, res, next) => {
    res.status(404).json({
      error: 'Data not found'
    });
    next();
  });

  // Handle application error
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('We got an error!', error);

    if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({
          error: 'Unexpected error: ' + error
        });
    }
    next(error);
  });
}
