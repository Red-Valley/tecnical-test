import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useI18n } from "hooks/useI18n";
import { useState } from "react";

const ChatHeader = ({ user, onLogout }: ChatHeaderProps) => {
  const { messages: langMessages, locale } = useI18n();
  const { chat_room } = langMessages[locale];

  const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);
  const options = [{ name: chat_room.header.logout, onClick: () => handleLogout() }];

  const handleOpenOptions = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorRef(e.currentTarget);
  };

  const handleLogout = () => {
    onLogout();
    setAnchorRef(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={chat_room.header.options_tooltip}>
            <IconButton
              sx={{ p: 1, gap: 1, color: "var(--third)" }}
              onClick={handleOpenOptions}
            >
              <Avatar alt={user?.username} src={user?.photo} />
            </IconButton>
          </Tooltip>
          <Box component="h3">{user?.name}</Box>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorRef}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={!!anchorRef}
            onClose={() => setAnchorRef(null)}
          >
            {options.map((option, index) => (
              <MenuItem key={`option_${index}`} onClick={option.onClick}>
                <Typography textAlign="center">{option.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
};

export default ChatHeader;
