interface ISendMessage {
  user_id: string;
  content: string;
  command?: boolean;
}
interface ISendMessageAction {
  type: string;
  payload: ISendMessage;
}

interface IListMsgPage {
  page: number;
}
interface IMessage extends ISendMessage {
  id: string;
  user: IUser;
  createdAt: string;
}
interface IListMessagesAction {
  type: string;
  payload: BasePagination;
}
interface IMessagesAction {
  type: string;
  payload: T<IMessage | IMessage[] | IListMsgPage>;
}

interface ChatRoomState extends BaseActionState {
  page?: number;
  messages?: IMessage[];
}
