interface ISendMessage {
  user_id: string;
  content: string;
  command?: boolean;
}
interface ISendMessageAction {
  type: string;
  payload: ISendMessage;
}

interface IMessage extends ISendMessage {
  id: string;
  createdAt: Date;
}
interface IListMessagesAction {
  type: string;
  payload: BasePagination;
}
interface IMessagesAction {
  type: string;
  payload: IMessage | IMessage[];
}

interface ChatRoomState extends BaseActionState {
    messages?: IMessage[],
}