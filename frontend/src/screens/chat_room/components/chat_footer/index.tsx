import { Box, FormControl, IconButton, Input, InputLabel } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import GifIcon from "@mui/icons-material/Gif";
import { globalStyles } from "utils/styles";
import { useState } from "react";

interface ChatFooterProps {
  onSubmit: (message: string) => void;
}

const ChatFooter = ({ onSubmit }: ChatFooterProps) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e: any) => {
    e && e.preventDefault();
    if (message.length) {
      onSubmit(message);
      setMessage("");
    }
  };
  return (
    <Box
      component="form"
      action=""
      onSubmit={handleSubmit}
      noValidate
      sx={{ p: 2 }}
    >
      <FormControl sx={globalStyles.fullWidth} variant="standard">
        <InputLabel htmlFor="send-message">Type a Message</InputLabel>
        <Input
          required
          id="send-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          startAdornment={
            <IconButton size="medium" onClick={() => {}}>
              <GifIcon fontSize="inherit" />
            </IconButton>
          }
          endAdornment={
            <IconButton
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
