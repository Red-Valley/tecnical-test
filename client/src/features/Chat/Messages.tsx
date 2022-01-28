import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Message from "./Message";
import { MessageEntity } from "../../entities/message.entity";
import { Skeleton } from "@mui/material";



export interface MessagesProps{
  messages:MessageEntity[]
}

export default function Messages({messages}:MessagesProps) {
  const [isLoading, setIsLoading] = useState(false);

    let listMessages: any[] = [];

    let messageSkeleton = (
      <li className="list-item">
      <div>
      <Skeleton animation="wave" />     
      </div>    
      </li>
    );

  if (messages.length==0)
  {
    
    for (let index = 0; index < 5; index++) {      
      listMessages.push(messageSkeleton);
    }
  }
    else
    {
      listMessages =  messages.map((message,index)=>
      <Message key={index} isLoading={isLoading} message={message} ></Message>      
      );      
      
    }  
  

  return (
    <ul className="list">
       { listMessages}                
  </ul>
  );
}
