import { IUser } from 'models/auth'
import { IMessage } from 'models/socket'

export enum ActionKeys {
  SET_USERS = 'SET_USERS',
  SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT',
  SET_MESSAGE = 'SET_MESSAGE',
  SET_MESSAGES = 'SET_MESSAGES',
}

export interface ISetUsers {
  type: ActionKeys.SET_USERS
  payload: IUser[]
}

export interface ISetActiveChat {
  type: ActionKeys.SET_ACTIVE_CHAT
  payload: any
}

export interface ISetMessage {
  type: ActionKeys.SET_MESSAGE
  payload: IMessage
}

export interface ISetMessages {
  type: ActionKeys.SET_MESSAGES
  payload: IMessage[]
}

export type SocketActions = ISetUsers | ISetActiveChat | ISetMessage | ISetMessages
