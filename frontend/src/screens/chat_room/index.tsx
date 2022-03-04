import { RootState } from "@reducers";
import { listMessagesRequest, sendMessage } from "actions/chatRoomActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatRoomPage = () => {
  const dispatch = useDispatch();
  const { pending, messages, error }: ChatRoomState = useSelector(
    (state: RootState) => state.chatRoom
  );

  const [page] = useState(0);

  useEffect(() => {
    dispatch(listMessagesRequest({ page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e && e.preventDefault();
    dispatch(
      sendMessage({
        content: message,
        user_id: "62223f41a5ce29b1a97fb55c",
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        flex: 1,
        minHeight: "100vh",
      }}
    >
      <div>
        <h1>Messages</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1,
          padding: 15,
          gap: 3,
        }}
      >
        {messages &&
          messages.map((message, index) => (
            <div key={`message_${index}`}>
              <p>created by: {message.user_id}</p>
              <p>message: {message.content}</p>
              <p>at: {message.createdAt}</p>
            </div>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flex: 0.1,
          padding: 15,
        }}
      >
        <form style={{ display: "flex" }} action="" onSubmit={handleSubmit}>
          <input
            style={{ flex: 1 }}
            id="input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSubmit}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoomPage;
