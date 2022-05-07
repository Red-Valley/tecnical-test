import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from 'redux/rootReducer'
import { IUser } from 'models/auth'
import { IMessage } from 'models/socket'
import { ISetUsers, ISetActiveChat, ISetMessage, ISetMessages, ActionKeys, SocketActions } from './types'
import { clientWithToken } from 'utils/axios'

export const setUsers = (users: IUser[]): ISetUsers => ({
  type: ActionKeys.SET_USERS,
  payload: users,
})

export const setActiveChat = (userId: any): ISetActiveChat => ({
  type: ActionKeys.SET_ACTIVE_CHAT,
  payload: userId,
})

export const setMessages = (messages: IMessage[]): ISetMessages => ({
  type: ActionKeys.SET_MESSAGES,
  payload: messages,
})

export const postMessage = (message: IMessage): ISetMessage => ({
  type: ActionKeys.SET_MESSAGE,
  payload: message,
})

export const getMessages = (userId = ''): ThunkAction<void, RootState, null, SocketActions> | any => {
  return async (dispatch: ThunkDispatch<RootState, null, SocketActions>): Promise<any> => {
    try {
      const { data } = await clientWithToken({ endpoint: `messages/${userId}` })
      if (data.success) dispatch(setMessages(data?.messages))
    } catch (error) {
      return error
    }
  }
}
