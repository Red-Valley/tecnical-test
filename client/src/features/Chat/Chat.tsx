import { useNavigate } from "react-router-dom";
import ListMessages from "./ListMessages";
import TextBoxMessage from "../../features/Chat/TextBoxMessage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {  selectCurrentChatStatus, ChatStateStatuses, fetchConnectedUsers } from "../Chat/chatSlice";
import { selectAllOrderedMessages } from "./chatSlice";
import { useEffect } from "react";



function Chat() {
  const messages = useAppSelector(selectAllOrderedMessages);
  const chatStatus = useAppSelector(selectCurrentChatStatus);
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();  
  
  
  return (
    <div className="chatRoom">
      <div className="chatRoomContent">
        { chatStatus==ChatStateStatuses.joined?
        <ListMessages messages={messages}></ListMessages>  
        :   <ListMessages messages={[]}></ListMessages>   
        
        }
      </div>
      <div className="chatRoomFooter">
        {chatStatus==ChatStateStatuses.joined?<TextBoxMessage></TextBoxMessage>:"Not Connected!"
        }
        
      </div>
    </div>
  );
}

export default Chat;
