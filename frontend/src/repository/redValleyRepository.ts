import axios from "axios";
import Swal from "sweetalert2";
import { RED_VALLEY_API_URL } from "../constants";
import {
  CreateChatRoom,
  CreateUser,
  LoginData,
  ResultChatRoom,
  ResultChatRoomMessage,
  ResultUser,
} from "./types";

const http = axios.create({
  baseURL: RED_VALLEY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createChatRoom(data: CreateChatRoom) {
  return await http.post<ResultChatRoom>("/chat/room", data);
}

export async function getChatRooms() {
  return await http.get<ResultChatRoom[]>("/chat/room");
}

export async function getChatRoomMessages(chatRoomId: number) {
  return await http.get<ResultChatRoomMessage[]>(
    `/chat/room/${chatRoomId}/messages`
  );
}

export async function createUser(data: CreateUser) {
  return await http.post<ResultUser>("/users", data);
}

export async function getUser(id: number) {
  return await http.get<ResultUser>(`/users/${id}`);
}

export async function validateLogin(data: LoginData) {
  return await http.post<ResultUser | undefined>("/auth/login", data);
}

export async function deleteChatRoom(chatRoomId: number) {
  return await http.delete<boolean>(`/chat/room/${chatRoomId}`);
}

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    console.log(err);
    Swal.fire("Ha ocurrido un error", err.response.data.message, "error");
  }
);
