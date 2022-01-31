import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../features/Chat/Chat";
import { disconnecting } from "../../features/Chat/chatSlice";
import {
  selectUserStatus,
  UserStateStatuses,
} from "../../features/Chat/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function ChatRoom() {
  const dispatch = useAppDispatch();  
  const navigate = useNavigate();
  let userStatus = useAppSelector((state) => selectUserStatus(state));


  useEffect(() => {
    if (userStatus !== UserStateStatuses.online) {
      navigate("/");
    }
  }, [userStatus,navigate]);



  return <Chat></Chat>;
}

export default ChatRoom;
