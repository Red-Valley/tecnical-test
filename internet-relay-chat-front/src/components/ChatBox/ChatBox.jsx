import React from "react";
import Message from "./views/Message";
import Interlocutor from "./views/Interlocutor";
import useChatBox from "../ChatBox/Core/CustomHooks/useChatBox";
import styles from "./styles.module.scss";

export default function ChatBox() {
  const { messages, currentNickname } = useChatBox();
  return (
    <div className={styles.container}>
      {messages.map((message, index) => {
        if (message.interlocutor) {
          return (
            <>
              <Interlocutor
                message={message.message}
                key={`message-number-key-${index}`}
              />
            </>
          );
        }
        if (message.nickname === currentNickname) {
          if (message.isImage) {
            return (
              <>
                <br />
                <Message
                  incomingMsg={false}
                  key={`message-number-key-${index}`}
                  message={message.message}
                  nickname={message.nickname}
                  date={message.date}
                  isImage={true}
                />
                <br />
              </>
            );
          }
          return (
            <>
              <Message
                incomingMsg={false}
                key={`message-number-key-${index}`}
                message={message.message}
                nickname={message.nickname}
                date={message.date}
              />
            </>
          );
        }
        if (message.nickname !== currentNickname) {
          if (message.isImage) {
            return (
              <>
                <br />
                <Message
                  key={`message-number-key-${index}`}
                  message={message.message}
                  nickname={message.nickname}
                  date={message.date}
                  isImage={true}
                />
                <br />
              </>
            );
          }
          return (
            <>
              <Message
                key={`message-number-key-${index}`}
                message={message.message}
                nickname={message.nickname}
                date={message.date}
              />
            </>
          );
        }
      })}
    </div>
  );
}
