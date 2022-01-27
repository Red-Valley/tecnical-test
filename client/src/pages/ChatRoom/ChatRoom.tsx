import { useNavigate } from "react-router-dom";
import Messages from "../../features/Messages/Messages";
import TextBoxMessage from "../../features/TextBoxMessage/TextBoxMessage";
function ChatRoom() {
  const navigate = useNavigate();

  return (
    <div className="chatRoom">
      <div className="chatRoomContent">
        <Messages messages={[]}></Messages>
      </div>
      <div className="chatRoomFooter">
        <TextBoxMessage></TextBoxMessage>
      </div>
    </div>
  );
}

export default ChatRoom;
