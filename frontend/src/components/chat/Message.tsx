import React from 'react'
import { getHourAndMonth } from 'utils/date'
import { IMessageProps } from '.'
import './Chat.scss'

export const Message: React.FC<IMessageProps> = React.memo(({ message, isIncomingMessage = false }) => (
  <>
    {isIncomingMessage ? (
      <div className="relative flex items-center gap-2 pb-4">
        <img src="assets/images/user.png" alt="user" className="w-6 h-6 border border-gray-200 rounded-full" />
        {message?.isGif ? (
          <img src={message.message} alt="gif" className="h-20" />
        ) : (
          <p className="px-2 py-1 text-sm text-white break-words rounded-md bg-secondary max-text-large">
            {message.message}
          </p>
        )}
        <span className="absolute -bottom-0.5 text-tiny left-9 text-gray font-semibold">
          {getHourAndMonth(message?.createdAt)}
        </span>
      </div>
    ) : (
      <div className="relative flex flex-col items-end self-end gap-1">
        {message?.isGif ? (
          <img src={message.message} alt="gif" className="h-20" />
        ) : (
          <p className="px-2 py-1 text-sm text-white break-words rounded-md bg-secondary max-text-large">
            {message.message}
          </p>
        )}
        <p className="left-0 font-semibold text-tiny text-gray">{getHourAndMonth(message?.createdAt)}</p>
      </div>
    )}
  </>
))
