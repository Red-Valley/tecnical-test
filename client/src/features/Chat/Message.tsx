import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { MessageEntity } from "../../entities/message.entity";
import TimeAgo from "./TimeAgo";
import { createTheme } from "@mui/material/node_modules/@mui/system";


export interface MessageProps {
    isLoading:boolean,
  message:MessageEntity
}

function createHTML(media:string) {
  return { __html: media };
}

export default function Messages({isLoading, message}:MessageProps) {

      let messageComponent;
      if (message.userName=='room')
      {
        messageComponent =
        <li className="list-item-room">
          <span>
            {message.body}     
          </span>    <TimeAgo timestamp={message.createdAt}></TimeAgo>    
          </li>        ;


      }else
      {

        messageComponent =
        <li className="list-item">
       <span className="nickName">
              {message.userName}  
        </span>         
        <TimeAgo timestamp={message.createdAt}></TimeAgo>     
        {
        message.body.indexOf('<img') || message.body.indexOf('<iframe')?
        <div dangerouslySetInnerHTML={createHTML(message.body)}/>
        :
        <div>{message.body}</div>
        }     
          </li>;

      }
      

   
    
    return(messageComponent);

    
}