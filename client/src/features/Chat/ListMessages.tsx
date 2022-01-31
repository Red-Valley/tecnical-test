import React, { useEffect, useState } from "react";
import Message from "./Message";
import { MessageEntity } from "../../entities/message.entity";
import { Skeleton } from "@mui/material";
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;



export interface MessagesProps{
  messages:MessageEntity[]
}


export default function ListMessages({messages}:MessagesProps) {
  const [isLoading, setIsLoading] = useState(false);

    let listMessages: any[] = [];

    


    useEffect(()=>{
      scroll.scrollToBottom();
    },[messages])


  if (messages.length==0)
  {
    
    for (let index = 0; index < 5; index++) {      
      listMessages.push(  <li key={`c${index}`} className="list-item">
      <div>
      <Skeleton animation="wave" />     
      </div>    
      </li>);
    }
  }
    else
    {
      listMessages =  messages.map((message,index)=>
      <Message key={index} isLoading={isLoading} message={message} ></Message>      
      );      
      
    }  
  

  return (
    <ul role="list" className="p-6 divide-y divide-slate-200">
       { listMessages}                
  </ul>
  );
}
