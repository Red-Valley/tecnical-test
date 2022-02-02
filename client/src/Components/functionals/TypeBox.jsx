import { Container, Grid, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { NEW_MESSAGE } from "../../redux/actions";
import { useSelector } from "react-redux"

const TypeBox = ({socket}) => {
  const {chat:{id, friend}, user:{_id}} = useSelector(state=>state)
  const [msg, setmsg] = useState()
  const handleClick =  ({target:{value}})=>{
    
    socket.current.emit("sendMessage", {
      senderId: _id,
      receiverId: friend.id,
      text: msg
    })
    
    NEW_MESSAGE({conversationId:id, text: msg, sender:_id})
    value=""
    setmsg("")
  }
  return (
    <Container sx={{ bgcolor: "#fff"}}>
      {
        id?
      <Grid container direction="row" justifyContent="center" alignItems="center" >
        <TextField id="filled-basic" onChange={({target:{value}})=>{setmsg(value)}} label="Type you message..." variant="filled" sx={{width:'80%'}} value={msg}/>
        <Button onClick={handleClick} variant="contained" endIcon={<SendIcon sx={{ marginLeft: 0, height: '40px' }} />}>
        </Button>
      </Grid>
      :
      <span></span>

      }
    </Container>
  );
};

export default TypeBox;
