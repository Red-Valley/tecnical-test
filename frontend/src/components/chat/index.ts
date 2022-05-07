import { Dispatch, SetStateAction } from 'react'
import { IUser } from 'models/auth'
import { IMessage } from 'models/socket'

export * from './Item'
export * from './Header'
export * from './Conversation'
export * from './Message'
export * from './GifBox'

/**
 * This interface describes the item props
 *
 * @typeParam user: IUser - User
 * @typeParam setActiveChat: (user: IUser) => void - Function that actives the new chat
 * @typeParam isActive: boolean - Indicates if the current chat is active
 */
export interface IItemProps {
  user: IUser
  setActiveChat: (user: IUser) => void
  isActive: boolean
}

/**
 * This interface describes the conversation props
 *
 * @typeParam activeChat: IUser - Current active user
 * @typeParam user: User- Logged user
 * @typeParam messages: IMessage[] - Message list of the current chat
 * @typeParam hasFriends: boolean - Indicates if the user has friends
 * @typeParam socket: any - Socket
 */
export interface IConversationProps {
  activeChat: IUser
  user: IUser
  messages: IMessage[]
  hasFriends: boolean
  socket: any
}

/**
 * This interface describes the message props
 *
 * @typeParam isIncomingMessage: boolean - Boolean that indicates if the message is incoming
 * @typeParam message: IMessage - Chat message
 */
export interface IMessageProps {
  isIncomingMessage: boolean
  message: IMessage
}

/**
 * This interface describes the header props
 *
 * @typeParam logout: () => void - Function for the user logout
 * @typeParam Dispatch<SetStateAction<string>> - Function that change the input value
 */
export interface IHeaderProps {
  logout: () => void
  changeValue: Dispatch<SetStateAction<string>>
}
