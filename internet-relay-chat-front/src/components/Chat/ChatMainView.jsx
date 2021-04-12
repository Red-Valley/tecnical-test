import React from "react";
import { IconButton, TextField } from "@material-ui/core";
import useChatActions from "./Core/CustomHooks/useChatActions";
import SendIcon from "@material-ui/icons/Send";
import styles from "./styles.module.scss";

export default function ChatMainView() {
  const { onWriteMessage, onSendMessage, message } = useChatActions();
  return (
    <div className={styles.userContainer}>
      <div className={styles.options}>
        <div className={styles.chat}>
          <TextField
            className={styles.chatBox}
            placeholder="Send message..."
            variant="outlined"
            fullWidth
            value={message.message}
            InputProps={{
              classes: { notchedOutline: styles.noBorder },
            }}
            onChange={onWriteMessage}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSendMessage();
              }
            }}
          />
        </div>
        <div className={styles.sender}>
          <IconButton onClick={onSendMessage}>
            <SendIcon className={styles.senderIcon} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
