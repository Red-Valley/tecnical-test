import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { format } from 'timeago.js'
import { CHAT } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const MessageItem = ({ name, message, profile, date, id, friend}) => {

  const [time, settime] = useState(format(date, 'en_US'));
  const dispatch = useDispatch()

  const handleChat = (id)=>{
    dispatch(CHAT(id, friend))
  }

  return (
    <>
      <ListItem alignItems="flex-start" onClick={()=>handleChat(id)} >
        <ListItemAvatar>
          <Avatar alt={name} src={import.meta.env.VITE_DOMAIN + profile} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <>
              {message}<br />
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="subtitle2"
                color="text.primary"
              >
                {/* {time} */}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />

    </>
  )
};

export default MessageItem;
