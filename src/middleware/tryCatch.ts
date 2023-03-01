import { Response, Request, NextFunction } from "express";
import { HttpError } from "http-errors";

type Middleware = (req: Request, res: Response, next: NextFunction) => unknown;

export default function tryCatch(middleware: Middleware, status?: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await middleware(req, res, next);
      res.status(status || 200).send(response);
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.status).send({ message: err.message });
      } else next(err);
    }
  };
}
