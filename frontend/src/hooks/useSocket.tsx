import { useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client'

const useSocket = (path: string) => {
  // const socket = useMemo(() => io(path, { transports: ['websocket'] }), [path])
  const [socket, setSocket] = useState<any>(null)
  const [online, setOnline] = useState(false)

  const connectSocket = useCallback(() => {
    const token = localStorage['token']

    const currentSocket = io(path, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        authorization: token,
      },
    })

    setSocket(currentSocket)
  }, [path])

  const disconnectSocket = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  useEffect(() => {
    setOnline(socket?.connected)
    socket?.on('connect', () => setOnline(true))
    socket?.on('disconnect', () => setOnline(false))
  }, [socket])

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  }
}

export default useSocket
