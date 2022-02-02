import * as React from 'react';
import List from '@mui/material/List';
import FriendItem from './FriendItem';
import { useSelector } from 'react-redux';

export default function FriendList() {
  const { users } = useSelector(state => state)
  return (
    <List sx={{ width: '100%', maxWidth: 360,  zIndex:0 }}>
      {
        users.map((e, i) => (
          <FriendItem name={e.username} state={"offline"} key={e._id} profile={'images/' + (i+1) + '.jpg'} id={e._id}/>
))
      }
    </List>
  );
}
