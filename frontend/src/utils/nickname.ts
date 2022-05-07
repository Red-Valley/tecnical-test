import axios from 'axios'

export const getNickname = async () => {
  const { data } = await axios('https://randomuser.me/api/')
  return data?.results[0]?.name.first
}
