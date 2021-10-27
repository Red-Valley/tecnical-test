import { Request, Response } from "express";

import { Route } from "../../utils/types";
import { Collections } from "../../utils/constants";
import { validatorId } from "../../utils/validators";
import { RoomModel } from "../../models/chat/room";
import { RoomRepository } from "../../respositories/roomRepository";
import { FBAuth } from "../../utils/auth/fbAuth";

const get: Route = {
  path: `/${Collections.Rooms}`,
  method: "get",
  handler: [
    FBAuth,
    async (req: Request, res: Response) => {
      res.status(200).json(await new RoomRepository().get());
    },
  ],
};

const getById: Route = {
  path: `/${Collections.Rooms}/:id`,
  method: "get",
  handler: [
    FBAuth,
    validatorId,
    async (req: Request, res: Response) => {
      res.status(200).json(await new RoomRepository().getById(req.params.id));
    },
  ],
};

const create: Route = {
  path: `/${Collections.Rooms}/create`,
  method: "post",
  handler: [
    FBAuth,
    async (req: Request, res: Response) => {
      const model = new RoomModel(req.body);
      res.status(200).json(await new RoomRepository().create(model));
    },
  ],
};

const update: Route = {
  path: `/${Collections.Rooms}/update/:id`,
  method: "put",
  handler: [
    FBAuth,
    validatorId,
    async (req: Request, res: Response) => {
      const model = new RoomModel(req.body);
      res
        .status(200)
        .json(await new RoomRepository().update(req.params.id, model));
    },
  ],
};

const del: Route = {
  path: `/${Collections.Rooms}/delete/:id`,
  method: "delete",
  handler: [
    FBAuth,
    validatorId,
    async (req: Request, res: Response) => {
      res.status(200).json(await new RoomRepository().delete(req.params.id));
    },
  ],
};

export default [get, getById, create, update, del];
