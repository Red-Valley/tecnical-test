import React from 'react'
import { IItemProps } from '.'
import './Chat.scss'

export const Item: React.FC<IItemProps> = React.memo(({ user, isActive = false, setActiveChat = () => {} }) => {
  return (
    <div className={`chat-item ${isActive ? 'active-chat' : ''}`} onClick={() => setActiveChat(user)}>
      <img src="assets/images/user.png" alt="user" className="w-12 h-12 ml-1 border-gray-200 rounded-full" />
      <div className="flex-1">
        <h3 className="text-sm font-bold">{user?.name}</h3>
        <span className={`text-sm ${user?.online ? 'text-secondary' : 'text-gray'}`}>
          {user?.online ? 'Online' : 'Offline'}
        </span>
      </div>
      <div className="chat-item__shadow" />
      <i className={`chat-item__check fa-solid fa-circle-check ${user?.online ? 'text-secondary' : 'text-gray'}`} />
    </div>
  )
})
