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


export interface MessageProps {
    isLoading:boolean,
  message:MessageEntity | null
}

export default function Messages({isLoading, message}:MessageProps) {
    let messageSkeleton = (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText>
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          
          </ListItemText>
        </ListItem>
      );
    
    return(isLoading?messageSkeleton:(
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={message?.userName}
          secondary={<>
          <div>
          {message?.body}
          </div>
          
          <div>
          <TimeAgo timestamp={message?.createdAt}></TimeAgo>
          </div>
          
          </>}        
        />
      </ListItem>)  
        )

    
}