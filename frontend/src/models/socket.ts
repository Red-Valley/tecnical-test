export interface IMessage {
  createdAt: string
  from: string
  to: string
  _id: string
  updatedAt: string
  message: string
  isGif?: boolean
}
