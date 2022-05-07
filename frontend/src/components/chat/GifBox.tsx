/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react'
import { getGifs } from 'utils/gif'

export const GifBox: React.FC<{ sendGif: (gif: string) => void }> = ({ sendGif }) => {
  const [gifs, setGifs] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  const defaultData = useMemo(async (): Promise<string[]> => await getGifs(), [])

  const getData = async () => setGifs(await (searchValue ? getGifs(searchValue) : defaultData))

  useEffect(() => {
    getData()
  }, [searchValue])

  return (
    <div className="gif-box">
      <div className="flex justify-center p-2 mx-4">
        <input
          placeholder="Buscar"
          className="w-full p-2 text-sm bg-gray-200 border outline-none rounded-2xl"
          onChange={({ target }) => setSearchValue(target.value)}
        />
      </div>
      <div className="gif-box__list">
        {gifs?.map((gif: string) => (
          <img
            key={gif}
            src={gif}
            alt="gif"
            className="w-full h-full min-h-full cursor-pointer"
            onClick={() => sendGif(gif)}
          />
        ))}
      </div>
    </div>
  )
}
