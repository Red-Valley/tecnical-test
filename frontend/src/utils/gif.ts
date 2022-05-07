import axios from 'axios'

export const API_KEY = 'LsVJy4QmPtSASJ5Hb4gcoLGz2XpdsnmO'

export const getGifs = async (searchValue = ''): Promise<string[]> => {
  const url = searchValue
    ? `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchValue}`
    : `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`

  const { data } = await axios(url)
  return data.data?.map((image: any) => image.images.original?.url)
}
