import { IUser } from 'pages/login'

export * from './Auth'

/**
 * This interface describes the props of the auth form
 *
 * @typeParam data: IUser - User data
 * @typeParam handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void - Function for change the user data
 * @typeParam onSubmit: (e: React.FormEvent<HTMLFormElement>) => void - Function for send the form
 */
export interface IAuthFormProps {
  data: IUser
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
