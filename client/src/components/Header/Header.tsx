import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
<<<<<<< HEAD
import { logout } from "../../features/Chat/userSlice";
=======
>>>>>>> dev
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../features/Chat/userSlice";
import { disconnecting, fetchConnectedUsers, selectCurrentTotalUsers } from "../../features/Chat/chatSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let user =useAppSelector(selectCurrentUser); 
  let totalUsers =useAppSelector(selectCurrentTotalUsers); 

   useEffect(() => {
<<<<<<< HEAD
   // setInterval(() => {
    dispatch<any>(fetchConnectedUsers());
   //}, 30000)    
=======
     dispatch<any>(fetchConnectedUsers());
  
>>>>>>> dev
   }, []);

  

  const handleLogout = () => {
    dispatch(disconnecting(false));    
    navigate("/");
  };


  return (
    <header className="header sticky top-0 py-2 bg-sky-500 ">
      <nav className="flex justify-between text-white space-x-4">
        <div>
          <h4 className="pl-1">Geek Chat!</h4>
        </div>
        <div>
          <div className="flex items-center space-x-2 text-base">
            <h4 className="font-semibold text-slate-900">Users Connected</h4>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
              {totalUsers}
            </span>
          </div>
        </div>
        <div>
          <span className="font-bold p-2 text-white" >{user?.nickName}</span>
          { user?
          <a
            href="/"
            onClick={handleLogout}
            className="cursor-pointer hover:text-black px-4"
          >
            Logout
          </a>:''
          }
        </div>
      </nav>
    </header>
  );
};
export default Header;
