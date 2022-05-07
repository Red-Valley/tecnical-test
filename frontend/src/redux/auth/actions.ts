import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RootState } from 'redux/rootReducer'
import { client } from 'utils/axios'
import { IUser } from 'models/auth'
import { ISetError, ISetUser, ActionKeys, AuthActions } from './types'

export const setError = (error: unknown): ISetError => ({
  type: ActionKeys.SET_ERROR,
  payload: error,
})

export const setAuth = (user: IUser): ISetUser => ({
  type: ActionKeys.SET_USER,
  payload: user,
})

export const login = (user: {
  email: string
  password: string
}): ThunkAction<void, RootState, null, AuthActions> | any => {
  return async (dispatch: ThunkDispatch<RootState, null, AuthActions>): Promise<void> => {
    try {
      const { data } = await client({ endpoint: 'login', data: user, method: 'POST' })
      if (data.success) {
        const { user, token } = data
        localStorage.setItem('token', token)
        dispatch(setAuth({ ...user, checking: true, logged: true }))
      }
      return data.success
    } catch (error) {
      dispatch(setError(error))
    }
  }
}

export const registerUser = (user: {
  email: string
  password: string
  name: string
}): ThunkAction<void, RootState, null, AuthActions> | any => {
  return async (dispatch: ThunkDispatch<RootState, null, AuthActions>): Promise<void> => {
    try {
      const { data } = await client({ endpoint: 'login/register', data: user, method: 'POST' })
      return data?.success
    } catch (error) {
      dispatch(setError(error))
    }
  }
}

export const signOff = (): ThunkAction<void, RootState, null, AuthActions> | any => {
  return async (dispatch: ThunkDispatch<RootState, null, AuthActions>): Promise<void> => {
    dispatch(setAuth({ uid: '', name: '', email: '', online: false, checking: false, logged: false }))
  }
}
