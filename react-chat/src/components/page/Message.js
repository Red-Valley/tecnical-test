import React from 'react';
import {formatRelative} from 'date-fns'
import './style.css'


const Message = ({
    email= '',
    text = '',
    createdAT = null,
    displayName = '',
    photoURL = '',
    gif = '', 
}) => {
    return (
        <div className="message-container">
            {photoURL ? ( 
                <div className="img-container">
                    <img src={photoURL} alt="avatar"/>
                </div>
            ) : <div className="img-container">{email.toUpperCase().split('')[0]}</div>}
            {displayName ? <p className="chat-name">{displayName}</p> : <p className="chat-name">{email.split('@')[0]}</p>}
            {createdAT?.seconds ? (
                <span className="chat-date">
                    { formatRelative(new Date(createdAT.seconds * 1000), new Date() )}
                </span>
            ) : null}
            {gif.length > 50 ? <div className="gif-container"> <img src={gif} alt="avatar"/></div> : <p className="chat-text">{text}</p>}
        </div>
    );
}
 
export default Message;