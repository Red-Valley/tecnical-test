import { Router, Request, Response, NextFunction } from "express";

type Wrapper = (router: Router) => void;
export { Wrapper };

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;
export { Handler };

type Route = {
  path: string;
  method: "get" | "post" | "delete" | "put";
  handler: Handler | Handler[];
};
export { Route };

export type Predicate<T, U> = (item: U) => T;