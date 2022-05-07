import React, { useState } from 'react'

import { IConversationProps, Message, GifBox } from '.'

export const Conversation: React.FC<IConversationProps> = React.memo(
  ({ activeChat = {}, user = {}, socket = {}, messages = [], hasFriends = false }) => {
    const [message, setMessage] = useState<string>('')
    const [showGifs, setShowGifs] = useState<boolean>(false)

    const sendMessage = async () => {
      if (!message) return
      socket?.emit('message', {
        from: user.uid,
        to: activeChat.uid,
        message,
      })
      setMessage('')
    }

    const sendGif = async (gif: string) => {
      socket?.emit('message', {
        from: user.uid,
        to: activeChat.uid,
        message: gif,
        isGif: true,
      })
      setShowGifs(!showGifs)
    }

    return (
      <section className="relative flex flex-col flex-1 h-full">
        {activeChat.name ? (
          <>
            <div className="flex items-center justify-between px-2 border border-l-0 h-14">
              <div className="flex items-center gap-2">
                <img src="assets/images/user.png" alt="user" className="w-8 h-8 border border-gray-200 rounded-full" />
                <p className="font-bold">{activeChat?.name}</p>
              </div>
              <div className="flex items-center gap-4 text-secondary">
                <i className="fa-solid fa-phone" />
                <i className="fa-solid fa-video" />
                <i className="fa-solid fa-circle-exclamation" />
              </div>
            </div>
            <div className="flex flex-col h-full mt-2 overflow-y-auto" id="messages">
              <div className="h-full px-3 py-2">
                <div className="flex flex-col gap-3">
                  {messages.map(message => (
                    <Message key={message._id} isIncomingMessage={message.to === user.uid} message={message} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center h-12 gap-2 px-2">
              <div className="relative flex items-center gap-2">
                <i className="text-lg cursor-pointer fa-solid fa-image text-secondary" />
                <div
                  className="flex items-center justify-center w-5 h-4 font-bold text-white rounded-sm cursor-pointer bg-secondary text-tiny"
                  onClick={() => setShowGifs(!showGifs)}
                >
                  GIF
                </div>
                <i className="text-lg cursor-pointer fa-solid fa-video text-secondary" />
                {showGifs && <GifBox sendGif={sendGif} />}
              </div>
              <input
                type="text"
                className="flex-1 px-4 py-1 text-sm outline-none rounded-2xl bg-green h-9 bg-gray-dark"
                placeholder="Escribe algo.."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <i className="text-lg cursor-pointer fa-solid fa-paper-plane text-secondary" onClick={sendMessage} />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center h-12 m-auto text-center text-secondary">
            {hasFriends ? (
              <>
                <h2 className="text-xl font-bold">Selecciona un chat</h2>
                <i className="text-2xl fa-solid fa-hand-point-left" />
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">Consigue amigos bro xd</h2>
                <i className="text-2xl text-yellow-500 fa-solid fa-face-sad-cry" />
              </>
            )}
          </div>
        )}
      </section>
    )
  }
)
