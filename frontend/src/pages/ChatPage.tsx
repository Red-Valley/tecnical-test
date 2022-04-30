import React from "react";
import { useParams } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import SendIcon from "@mui/icons-material/Send";

import { getChatRoomMessages } from "../repository/redValleyRepository";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import GifBrowser from "../components/GifBrowser";
import ChatMessage from "../components/ChatMessage";
import { RED_VALLEY_WS_URL } from "../constants";
import {
  CreateChatRoomMessage,
  ResultChatRoomMessage,
  ResultGif,
} from "../repository/types";

const ChatPage: React.FC = () => {
  const params = useParams();
  const componentMounted = React.useRef(true);
  const authState = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = React.useState<ResultChatRoomMessage[]>([]);
  const [client, setClient] = React.useState<Socket | null>(null);
  const [inputText, setInputText] = React.useState("");

  async function loadMessages() {
    const responseMessages = await getChatRoomMessages(Number(params.id));
    if (componentMounted.current) {
      setMessages(responseMessages.data);
    }
  }

  function connectToWebSocket() {
    setClient(socketIOClient(RED_VALLEY_WS_URL));
  }

  function sendMessage(text: string) {
    if (!text) return;

    const message: CreateChatRoomMessage = {
      chatRoomId: Number(params.id),
      message: text,
      userId: authState.user!.id,
    };

    client?.emit("roomChat/send", message);
    setInputText("");
  }

  React.useEffect(() => {
    client?.on(
      `roomChat/${params.id}/receive`,
      (message: ResultChatRoomMessage) => {
        setMessages((value) => [...value, message]);
      }
    );
  }, [client]);

  React.useEffect(() => {
    loadMessages().then(() => connectToWebSocket());

    return () => {
      componentMounted.current = false;
    };
  }, []);

  function handleSelectGif(e: ResultGif) {
    sendMessage(e.images.original.url);
  }

  function handleSendMessage() {
    sendMessage(inputText);
  }

  return (
    <Box
      bgcolor="#4a8be0"
      height="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Box flex="1 1 auto" overflow="auto">
        {messages.map((e) => {
          return (
            <ChatMessage
              loggedUserId={authState.user!.id}
              messageItem={e}
              key={`chat-message-${e.id}`}
            />
          );
        })}
      </Box>
      <GifBrowser
        commandToShow="/giphy"
        text={inputText}
        onSelect={handleSelectGif}
      />
      <Box bgcolor="white" padding={2} display="flex" alignItems="end">
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Box width="10px" />
        <Fab color="primary" size="medium" onClick={handleSendMessage}>
          <SendIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default ChatPage;
