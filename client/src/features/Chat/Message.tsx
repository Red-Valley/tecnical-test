import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MessageEntity } from "../../entities/message.entity";
import { RootState } from "../../store/store";
import { selectCurrentUser } from "../User/userSlice";
import { selectAvatarByUserName } from "./chatSlice";
import TimeAgo from "./TimeAgo";



export interface MessageProps {
    isLoading:boolean,
  message:MessageEntity
}

function createHTML(media:string) {
  return { __html: media };
}

export default function ListMessages({isLoading, message}:MessageProps) {

  const avatar = useSelector((state:RootState) => selectAvatarByUserName(state, message.nickName));

      let messageComponent;
      if (message.nickName=='room')
      {
        messageComponent =
        <li className="list-item-room">
          <span>
            {message.body}     
          </span>    <TimeAgo timestamp={message.createdAt}></TimeAgo>    
          </li>        


      }else
      {

        messageComponent =
        <li className="flex py-4 first:pt-0 last:pb-0">

      <img className="h-10 w-10 rounded-full" src={`assets/images/avatars/${avatar?avatar:'00.png'}`} alt="" />
      <div className="ml-3 overflow-hidden">
        <p className="text-sm font-medium text-slate-900">{message.nickName}</p>
        
        <div className="text-sm text-slate-500 truncate">     {
        message.body.indexOf('<img') || message.body.indexOf('<iframe')?
        <div dangerouslySetInnerHTML={createHTML(message.body)}/>
        :
        <div>{message.body}</div>
        }     </div>
          
      </div>
      <TimeAgo timestamp={message.createdAt}></TimeAgo>

  
          </li>;

      }
      

   
    
    return(messageComponent);

    
}