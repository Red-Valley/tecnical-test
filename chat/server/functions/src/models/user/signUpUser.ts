import { BaseModel } from "../baseModel";
import { Time } from "../../utils/converters/date";

export interface ISignUpUser {
  nickname: string;
  email: string;
  password: string;
  confirmpassword: string;
  userId?: string;
  created: Date;
}

export class SignUpUserModel
  extends BaseModel<ISignUpUser>
  implements ISignUpUser
{
  nickname: string;
  email: string;
  password: string;
  confirmpassword: string;
  userId?: string;
  created: Date;

  constructor(data: ISignUpUser) {
    super();
    this.nickname = data.nickname;
    this.email = data.email;
    this.password = data.password;
    this.confirmpassword = data.confirmpassword;
    this.created = Time.TimestampToDate(data.created || new Date());
  }

  toSaveMap(): ISignUpUser {
    return {
      nickname: this.nickname,
      email: this.email,
      userId: this.userId,
      created: Time.DateToTimestamp(this.created),
    } as ISignUpUser;
  }
}
