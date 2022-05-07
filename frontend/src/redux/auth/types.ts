import { IUser } from 'models/auth'

export enum ActionKeys {
  SET_ERROR = 'SET_ERROR',
  SET_USER = 'SET_USER',
}

export interface ISetUser {
  type: ActionKeys.SET_USER
  payload: IUser
}

export interface ISetError {
  type: ActionKeys.SET_ERROR
  payload: unknown
}

export type AuthActions = ISetUser | ISetError
