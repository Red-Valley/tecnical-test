import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { IGif } from "@giphy/js-types";
import {
  Gif,
  VideoOverlay
} from "@giphy/react-components";
import { ChangeEvent, MouseEvent, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { buildMessage } from './textBoxMessageSlice';


export default function TextBoxMessage() {
    const dispatch = useAppDispatch(); 
  const [message,setMessage] = useState('');

  const handleSendMessage=async (event:MouseEvent<HTMLButtonElement>)=>{
     try {         
       if(message)
       {
      dispatch(buildMessage(message));
      setMessage('');   
       }
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
  
    }
     
  }

  const handleChangeMessage=(event:ChangeEvent<HTMLInputElement>)=>{
    //dispatch(messageSent(message));
     setMessage(event.target.value);    
  }

  
  return (
    <div className='textBoxMessage p-5'>
           <TextField
          label="Write a Message"
          multiline
          fullWidth
          onChange={handleChangeMessage}
          rows={4}
          value={message}
          defaultValue=""
        />
        <Button  onClick={handleSendMessage}>Send</Button>
    </div>
  );
}
