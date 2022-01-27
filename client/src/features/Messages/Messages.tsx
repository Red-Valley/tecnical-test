import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Message, { MessageModel } from "./Message";



export interface MessagesProps{
  messages:MessageModel[]
}

export default function Messages({messages}:MessagesProps) {
  const [isLoading, setIsLoading] = useState(true);

    let listMessages: any[] = [];

  if (messages.length==0)
  {
    
    for (let index = 0; index < 13; index++) {      
      listMessages.push(<Message key={index} isLoading={true} message={null} ></Message>);
    }
  }
    else
    {
      listMessages =  messages.map((message,index)=>
      <Message key={index} isLoading={isLoading} message={message} ></Message>      
      );      
      
    }  
  

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
       { listMessages       
      }                
  </List>
  );
}
