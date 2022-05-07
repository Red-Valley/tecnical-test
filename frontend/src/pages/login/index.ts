export { default } from './Login'

/**
 * This interface describes the props of the each user
 *
 * @typeParam email: string - User email
 * @typeParam password: string - User password
 * @typeParam remindMe: string - Indicates if save the email in the login form
 * @typeParam name: string - Optional name
 */
export interface IUser {
  email: string
  password: string
  remindMe: boolean
  name?: string
}
