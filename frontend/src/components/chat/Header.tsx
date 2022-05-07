import React from 'react'
import { IHeaderProps } from '.'

export const Header: React.FC<IHeaderProps> = React.memo(({ logout = () => {}, changeValue = () => {} }) => (
  <div className="px-2">
    <div className="flex items-center h-14">
      <h3 className="text-2xl font-bold">Chats</h3>
      <div className="flex justify-end flex-1 gap-2">
        <div className="flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full">
          <i className="text-sm fa-solid fa-pen-to-square" />
        </div>
        <div className="flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full">
          <i className="text-sm fa-solid fa-camera" />
        </div>
        <div className="flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full">
          <i className="text-sm cursor-pointer fa-solid fa-right-from-bracket" onClick={logout} />
        </div>
      </div>
    </div>
    <div className="relative mt-2">
      <i className="absolute transition-all duration-200 cursor-pointer fa-solid fa-magnifying-glass left-2 top-3 active:scale-95" />
      <input
        type="text"
        className="w-full py-2 text-sm text-gray-500 bg-gray-200 border outline-none pl-7 rounded-xl"
        placeholder="Buscar chat"
        onChange={({ target }) => changeValue(target.value)}
      />
    </div>
  </div>
))
