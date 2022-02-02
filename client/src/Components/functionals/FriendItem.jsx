import {ListItem, ListItemText, ListItemAvatar, Divider, Avatar} from '@mui/material/';
import axios from 'axios';
import { read_cookie } from 'sfcookies';

const FriendItem = ({ name, profile, state, id }) => {


  const handleClick = async () => {
    await axios.post(`${import.meta.env.VITE_DOMAIN}conversation/`, { receiverId: id }, { headers: { token: read_cookie('userToken') } })
  }

  return (
  <>
    <ListItem alignItems="flex-start" onClick={handleClick}>
    <ListItemAvatar>
      <Avatar alt={name} src={import.meta.env.VITE_DOMAIN+profile} />
    </ListItemAvatar>
    <ListItemText
      primary={name}
      secondary={
        <>
          {state}<br/>
        </>
      }
    />
  </ListItem>
          <Divider variant="inset" component="li"/>
  </>
  )
};

export default FriendItem;
