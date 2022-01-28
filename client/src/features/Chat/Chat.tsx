import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Messages from "../../features/Chat/Messages";
import TextBoxMessage from "../../features/Chat/TextBoxMessage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { connecting, disconnecting } from "../Socket/socketSlice";
import { selectAllOrderedMessages, selectUserName } from "./chatSlice";

function Chat() {
  const messages = useAppSelector((state)=>selectAllOrderedMessages(state));
  const userName = useAppSelector((state)=>selectUserName(state));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();  
  
  useEffect(() => {
    dispatch(connecting(userName));
  }, []);


  return (
    <div className="chatRoom">
      <div className="chatRoomContent">
        <Messages messages={messages}></Messages>
      </div>
      <div className="chatRoomFooter">
        <TextBoxMessage></TextBoxMessage>
      </div>
    </div>
  );
}

export default Chat;
