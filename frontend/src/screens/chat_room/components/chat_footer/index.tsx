import { Box, FormControl, IconButton, Input, InputLabel } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import GifIcon from "@mui/icons-material/Gif";
import { useState } from "react";
import { meetMsgCommandPattern } from "utils/helper";
import { styles } from "./styles";
import { useI18n } from "hooks/useI18n";

const ChatFooter = ({ onSubmit, onOpenGifDialog }: ChatFooterProps) => {
  const { messages: langMessages, locale } = useI18n();
  const { chat_room } = langMessages[locale];

  const [message, setMessage] = useState("");

  const handleOpenGif = (message: string) => {
    onOpenGifDialog(message);
    setMessage("");
  };

  const handleSubmit = (e: any) => {
    e && e.preventDefault();
    if (message.length) {
      if (meetMsgCommandPattern(message)) {
        handleOpenGif(message);
      } else {
        onSubmit(message);
      }
      setMessage("");
    }
  };
  return (
    <Box
      component="form"
      action=""
      onSubmit={handleSubmit}
      noValidate
      sx={styles.footerContainer}
    >
      <FormControl sx={styles.footerForm} variant="standard">
        <InputLabel sx={styles.footerFormElement} htmlFor="send-message">
          {chat_room.footer.label}
        </InputLabel>
        <Input
          sx={styles.footerFormElement}
          required
          id="send-message"
          placeholder={chat_room.footer.placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          startAdornment={
            <IconButton
              sx={styles.footerFormElement}
              size="medium"
              onClick={() => handleOpenGif(message)}
            >
              <GifIcon fontSize="inherit" />
            </IconButton>
          }
          endAdornment={
            <IconButton
              sx={styles.footerFormElement}
              disabled={!message.trim().length}
              onClick={handleSubmit}
              size="medium"
            >
              <SendIcon fontSize="inherit" />
            </IconButton>
          }
        />
      </FormControl>
    </Box>
  );
};

export default ChatFooter;
