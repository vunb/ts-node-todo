import {Express, Request, Response} from "express";
import { logger } from "../config/logger";

export function routes(app: Express) {
  app.get("/", (req, res) => res.send('Ok'));

  // If no route is matched by now, it must be a 404
  app.use((req, res, next) => {
    res.status(404).json({
      error: "Endpoint not found"
    });
    next();
  });

  // Handle application error
  app.use((error: any, req: Request, res: Response, next:Function) => {
    logger.error("We got an error!", error);

    if (process.env.NODE_ENV === "production") {
        return res.status(500).json({
          error: "Unexpected error: " + error
        });
    }
    next(error);
  });
}
