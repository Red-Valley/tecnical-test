import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../httpClientError/httpErrors";

export const validatorId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    throw new HTTP400Error("Missing id parameter");
  } else {
    next();
  }
};
