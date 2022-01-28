import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { MessageEntity } from '../../entities/message.entity';
import { useAppDispatch } from '../../store/hooks';
import { sendMessage } from './chatSlice';
export default function TextBoxMessage() {
    const dispatch = useAppDispatch(); 
  const [message,setMessage] = useState('');

  const handleSendMessage=(event:MouseEvent<HTMLButtonElement>)=>{
    dispatch(sendMessage(message));
    setMessage('');    
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
