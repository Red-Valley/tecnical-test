import { Dispatch } from '@reduxjs/toolkit';
import swal from 'sweetalert2';
import { AuthAction, AuthActionType } from "../reducers/authReducer";
import { validateLogin as _validateLogin } from '../repository/redValleyRepository';
import { LoginData, ResultUser } from '../repository/types';

export async function validateLogin(data: LoginData) {
  return async (dispatch: Dispatch) => {
    const user = (await _validateLogin(data)).data;

    if (user) {
      dispatch(login(user))
    } else {
      swal.fire('El usuario no esta registrado', undefined, 'error');
    }
  }
}

export const login = (data: ResultUser): AuthAction => {
  return {
    type: AuthActionType.LOGIN,
    payload: data
  }
} 

export const logout = (): AuthAction => {
  return {
    type: AuthActionType.LOGOUT
  }
}