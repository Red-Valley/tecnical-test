import { IUser } from 'models/auth'
import { IMessage } from 'models/socket'
import { ActionKeys, SocketActions } from './types'

interface IState {
  uid: string
  activeChat: IUser
  users: IUser[]
  messages: IMessage[]
  error: unknown
}

const initialState: IState = {
  uid: '',
  activeChat: { uid: '', name: '', email: '', online: false },
  users: [],
  messages: [],
  error: '',
}

export const reducer = (state: IState = initialState, action: SocketActions): IState => {
  switch (action.type) {
    case ActionKeys.SET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case ActionKeys.SET_ACTIVE_CHAT:
      return {
        ...state,
        ...(state.activeChat.uid !== action.payload.uid && { activeChat: action.payload, messages: [] }),
      }
    case ActionKeys.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      }
    case ActionKeys.SET_MESSAGE:
      const updateMessages =
        (state.activeChat.uid === action.payload.from || state.activeChat.uid === action.payload.to) &&
        !state.messages?.find(message => message._id === action.payload._id)
      return {
        ...state,
        messages: updateMessages ? [...state.messages, action.payload] : state.messages,
      }
    default:
      return state
  }
}
