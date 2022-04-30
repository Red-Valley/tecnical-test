export interface ChatRoomMessage {
  id: number;
  message: string;
  datetime: Date;
  userId: number;
  chatRoomId: number;
  username: string;
}
