import { Response, Request, NextFunction } from "express";
import { Schema } from "joi";

// type ReqParts = 'params' | 'body' | 'query';
export enum ReqParts {
  PARAMS = "params",
  BODY = "body",
  QUERY = "query",
}

export function validation(
  schema: Schema,
  reqPart: ReqParts = ReqParts.BODY,
  message?: string
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req[reqPart], {
      abortEarly: false,
    });
    if (result.error) {
      return res
        .status(400)
        .send({ message: message || result.error.details[0].message });
    }
    next();
  };
}
