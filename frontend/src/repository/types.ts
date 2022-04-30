export interface CreateChatRoom {
  name: string;
}

export interface ResultChatRoom extends CreateChatRoom {
  id: number;
}

export interface CreateChatRoomMessage {
  message: string;
  userId: number;
  chatRoomId: number;
}

export interface ResultChatRoomMessage extends CreateChatRoomMessage {
  id: number;
  datetime: string;
  username: string;
}

export interface CreateUser {
  username: string;
}

export interface ResultUser {
  id: number;
  username: string;
}

export interface LoginData extends CreateUser {};

export interface ResultGif {
  title: string;
  images: {
    original: {
      url: string
    }
  }
}

export interface GiphyResponse {
  data: ResultGif[]
}