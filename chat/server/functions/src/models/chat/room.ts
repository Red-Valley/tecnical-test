import { BaseModel } from "../baseModel";
import { Time } from "../../utils/converters/date";

export interface IRoom {
  name?: string;
  created?: Date;
}

export class RoomModel extends BaseModel<IRoom> implements IRoom {
  name?: string;
  created?: Date;

  constructor(data: IRoom) {
    super();
    this.name = data.name;
    this.created = Time.TimestampToDate(data.created);
  }

  toSaveMap(): IRoom {
    return {
      name: this.name,
      created: Time.DateToTimestamp(this.created),
    } as IRoom;
  }
}
