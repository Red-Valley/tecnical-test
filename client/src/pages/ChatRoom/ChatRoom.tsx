import { useNavigate } from "react-router-dom";
import Chat from "../../features/Chat/Chat";
import Messages from "../../features/Chat/Messages";
import TextBoxMessage from "../../features/Chat/TextBoxMessage";
function ChatRoom() {
  const navigate = useNavigate();

  return (
    <Chat></Chat>
  );
}

export default ChatRoom;
