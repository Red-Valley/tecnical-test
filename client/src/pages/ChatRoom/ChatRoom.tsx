import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../features/Chat/Chat";
import {
  selectUserStatus,
  UserStateStatuses,
} from "../../features/User/userSlice";
import { useAppSelector } from "../../store/hooks";

function ChatRoom() {
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
