import {Express, Request, Response, NextFunction} from "express";
import { logger } from "../config/logger";
import { db } from "../config/knex";
import { userRouter } from './user.routes';

export function routes(app: Express) {
  app.get("/", (req, res) => res.send('Ok'));

  /**
   * Định tuyến các controller
   */
  app.use('/user', userRouter());

  // If no route is matched by now, it must be a 404
  app.use((req, res, next) => {
    res.status(404).json({
      error: "Data not found"
    });
    next();
  });

  // Handle application error
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error("We got an error!", error);

    if (process.env.NODE_ENV === "production") {
        return res.status(500).json({
          error: "Unexpected error: " + error
        });
    }
    next(error);
  });
}
