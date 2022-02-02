import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MessageItem from './MessageItem';
import { useSelector } from 'react-redux';

export default function MessagesList({conversations}) {

  const {users} = useSelector(state => state)

  return (
    <List sx={{ width: '100%', maxWidth: 360, zIndex: 1 }}>
      {
        conversations.map((e, i)=>{
          const [friend] = users.filter(u=>e.members.includes(u._id))
          console.log('este es friend:', friend)
          return(
            <MessageItem id={e?._id} friend={{id:friend?._id, username:friend?.username, profile:('images/' + (i+1) + '.jpg')}} key={friend?._id} name={friend?.username} message={e.message?.text} date={e.message?.createdAt} profile={'images/' + (i+1) + '.jpg'}/>
        )
        })
      }
    </List>
  );
}
