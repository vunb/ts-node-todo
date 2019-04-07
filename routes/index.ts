import {Express, Request, Response, NextFunction} from "express";
import { logger } from "../config/logger";
import { db } from "../config/knex";

export function routes(app: Express) {
  app.get("/", (req, res) => res.send('Ok'));

  app.get("/testdb", async (req, res) => {
    const result = await db('todos');
    logger.info('Data: ', result);

    res.json(result);
  });

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
