import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';


import { getChatRooms, deleteChatRoom } from "../repository/redValleyRepository";
import DialogCreateRoom from "../components/DialogCreateRoom";
import LogoutButton from "../components/LogoutButton";
import { ResultChatRoom } from "../repository/types";

interface State {
  loading: boolean;
  chatRooms: ResultChatRoom[];
  openDialog: boolean;
}

const RoomsPage: React.FC = () => {
  const navigate = useNavigate();
  const componentMounted = React.useRef(true);

  const [state, setState] = React.useState<State>({
    loading: true,
    chatRooms: [],
    openDialog: false,
  });

  async function loadChatRooms() {
    const response = await getChatRooms();
    if (componentMounted.current) {
      setState({
        ...state,
        loading: false,
        chatRooms: response.data,
      });
    }
  }

  React.useEffect(() => {
    loadChatRooms();
  }, []);

  function hadleRoomItemClick(id: number) {
    navigate(`/rooms/${id}`);
  }

  function openDialog(open: boolean) {
    setState((prev) => ({ ...prev, openDialog: open }));
  }

  async function handleCreateChatRoom() {
    await loadChatRooms();
    openDialog(false);
  }

  async function handleDeleteChatRoom(chatRoomId: number) {
    await deleteChatRoom(chatRoomId);
    await loadChatRooms();
  }

  return (
    <React.Fragment>
      <Typography variant="h3" align="center">
        Salas de Chat
      </Typography>
      <List>
        {state.chatRooms.map((e) => (
          <div>
            <ListItem 
              secondaryAction={
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={() => handleDeleteChatRoom(e.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText 
                  onClick={() => hadleRoomItemClick(e.id)}
                  primary={e.name} 
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <DialogCreateRoom
        onClose={() => openDialog(false)}
        open={state.openDialog}
        onSuccess={handleCreateChatRoom}
      />
      <LogoutButton />
      <Box position="absolute" bottom="15px" right="15px">
        <Fab onClick={() => openDialog(true)} color="primary">
          <AddIcon />
        </Fab>
      </Box>
    </React.Fragment>
  );
};

export default RoomsPage;
