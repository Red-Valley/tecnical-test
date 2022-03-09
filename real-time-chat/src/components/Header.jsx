import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { UserIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';

export default function Header() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const logout = () => {
    cookies.remove('idUser', { path: '/' });
    cookies.remove('username', { path: '/' });
    cookies.remove('name', { path: '/' });
    cookies.remove('nickname', { path: '/' });
    navigate("/", { replace: true });
  }
  return (
    <div className="header flex h-[10%] w-full bg-indigo-400 items-center p-1 justify-end">
      <div className="user-option flex w-full lg:w-1/4 justify-between mx-2">
        <div className="flex items-center bg-indigo-300 border-2 border-indigo-200 rounded-full">
          <div className="content-foto flex bg-gray-300 w-11 h-11 rounded-full items-center justify-center overflow-hidden border-2 border-gray-300">
            <UserIcon className="h-11 w-11 text-white relative top-1" />
          </div>
          <div className="flex items-center pl-2 pr-4 text-bold text-gray-700">{cookies.get('name') && cookies.get('name').toUpperCase()}</div>
        </div>
        <div className="flex bg-indigo-300 w-11 h-11 rounded-full items-center justify-center overflow-hidden border-2 border-indigo-200 hover:bg-gray-500 hover:text-white">
          <button onClick={logout}><LogoutIcon className="h-6 w-6" /> </button>
        </div>
      </div>
    </div>
  )
}
