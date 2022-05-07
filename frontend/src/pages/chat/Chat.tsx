/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/rootReducer'
import { signOff } from 'redux/auth/actions'
import { setUsers, postMessage } from 'redux/socket/actions'
import { setActiveChat, getMessages } from 'redux/socket/actions'
import { Item, Header, Conversation } from 'components/chat'
import { IUser } from 'models/auth'
import { IMessage } from 'models/socket'
import { scrollToBottomAnimated } from 'utils/scroll'
import useSocket from 'hooks/useSocket'
import './Chat.scss'

const Chat: React.FC = () => {
  const [navigate, dispatch] = [useNavigate(), useDispatch()]
  const [userSearchValue, setUserSearchValue] = useState<string>('')

  const {
    socket: { users, activeChat, messages },
    auth: { user },
  } = useSelector((state: RootState) => state)

  const { connectSocket, disconnectSocket, socket } = useSocket('http://localhost:8080/')

  const userList = useMemo(() => {
    const allUsers = users?.filter(item => user.uid !== item.uid)
    if (!userSearchValue) return allUsers
    return allUsers.filter(user => user.name.toLowerCase().includes(userSearchValue.toLowerCase()))
  }, [users, user.uid, userSearchValue])

  useEffect(() => {
    if (user.logged) connectSocket()
    else disconnectSocket()
  }, [user])

  useEffect(() => {
    socket?.on('user-list', (users: IUser[]) => dispatch(setUsers(users)))
  }, [socket])

  useEffect(() => {
    socket?.on('message', (message: IMessage) => {
      dispatch(postMessage(message))
      scrollToBottomAnimated('messages')
    })
  }, [socket])

  useEffect(() => {
    if (!localStorage['token']) navigate('/login')
  }, [navigate])

  const logout = () => {
    dispatch(signOff())
    dispatch(setActiveChat({}))
    disconnectSocket()
    localStorage.removeItem('token')
    navigate('/login')
  }

  const activateChat = (user: IUser) => {
    dispatch(setActiveChat(user))
    dispatch(getMessages(user.uid))
  }

  return (
    <div className="flex flex-col h-screen chat md:flex-row">
      <aside className="relative chat__conversations bg-green">
        <Header logout={logout} changeValue={setUserSearchValue} />
        <section className="chat__items-container">
          {userList?.map(user => (
            <Item key={user.uid} user={user} setActiveChat={activateChat} isActive={user?.uid === activeChat?.uid} />
          ))}
          {!!(users.length > 1 && !userList.length) && (
            <div className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-magnifying-glass" />
              <p className="text-sm text-center">No hay coincidencias</p>
            </div>
          )}
          <p className="absolute left-0 right-0 z-20 m-auto text-sm font-bold text-center bottom-8 text-secondary">
            {user.name}
          </p>
        </section>
      </aside>
      <Conversation {...{ activeChat, user, socket, messages }} hasFriends={users?.length > 1} />
    </div>
  )
}

export default Chat
