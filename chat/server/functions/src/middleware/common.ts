import { Router } from "express";
import cors from "cors";

export const handleCors = (router: Router) => {
  router.use(cors());
};
