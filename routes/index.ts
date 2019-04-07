import {Express} from "express";

export function routes(app: Express) {
  app.get("/", (req, res) => res.send('Ok'));

  // If no route is matched by now, it must be a 404
  app.use((req, res, next) => {
    res.status(404).json({
      error: "Endpoint not found"
    });
    next();
  });
}
