import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ResultChatRoomMessage } from "../repository/types";

interface Props {
  loggedUserId: number;
  messageItem: ResultChatRoomMessage;
}

const ChatMessage: React.FC<Props> = (props) => {
  const messageGif = [props.messageItem.message.split(" ")[0]].find(
    (e) => e.includes("http") && e.includes(".gif")
  );

  const sendedByLoggedUser = props.messageItem.userId === props.loggedUserId;

  return (
    <Box
      display="flex"
      margin={1}
      justifyContent={sendedByLoggedUser ? "flex-end" : "flex-start"}
    >
      {messageGif ? (
        <Box>
          <img src={messageGif} alt="gif" height="200px" loading="lazy" />
          <Typography
            color="white"
            align={sendedByLoggedUser ? "right" : "left"}
          >
            {props.messageItem.username} |{" "}
            {new Date(props.messageItem.datetime).toLocaleString()}
          </Typography>
        </Box>
      ) : (
        <Box
          bgcolor={sendedByLoggedUser ? "red" : "green"}
          borderRadius="99px"
          paddingX={4}
          paddingY={2}
          color="white"
          maxWidth="45%"
        >
          <Typography>{props.messageItem.message}</Typography>
          <Divider />
          <Box>
            <Typography>
              {props.messageItem.username} |{" "}
              {new Date(props.messageItem.datetime).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatMessage;
