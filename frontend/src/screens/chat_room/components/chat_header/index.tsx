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
import { useState } from "react";

interface ChatHeaderProps {
  user?: IUser;
  onLogout: () => void;
}

const ChatHeader = ({ user, onLogout }: ChatHeaderProps) => {
  const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);
  const options = [{ name: "Logout", onClick: () => handleLogout() }];

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
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton sx={{ p: 1 }} onClick={handleOpenOptions}>
              <Avatar alt={user?.username} src={user?.photo} />
            </IconButton>
          </Tooltip>
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
