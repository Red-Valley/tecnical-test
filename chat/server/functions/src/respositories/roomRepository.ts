import { IRoom } from "../models/chat/room";
import { Collections } from "../utils/constants";
import { BaseRepository } from "./baseRepository";

export class RoomRepository extends BaseRepository<IRoom> {
  constructor() {
    super(Collections.Rooms);
  }

  mapFields = (document: FirebaseFirestore.DocumentData) => {
    return document as IRoom;
  };
}
