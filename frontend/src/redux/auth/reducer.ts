import { IUser } from 'models/auth'
import { ActionKeys, AuthActions } from './types'

interface IState {
  user: IUser
  error: unknown
}

const initialState: IState = {
  user: { uid: '', name: '', email: '', online: false, checking: false, logged: false },
  error: '',
}

export const reducer = (state: IState = initialState, action: AuthActions): IState => {
  switch (action.type) {
    case ActionKeys.SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case ActionKeys.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
