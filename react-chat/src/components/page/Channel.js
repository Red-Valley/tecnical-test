import React, { useEffect, useState } from 'react';
import firebase from '../firebase/client'
import Message from './Message'
import Button from './Button';
import './style.css'
import Axios from 'axios'


const Channel = ({user, db}) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [gifs, setGifs] = useState(false);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState([]);
    const [gif, setGif] = useState([])


    const {uid, displayName, photoURL} = user;

    useEffect(() => {
        if(db){
            const message = db
                .collection('messages')
                .orderBy('createdAT')
                .limit(100)
                .onSnapshot(querySnapshot => {
                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                    setMessages(data)
                })

            return message;
        }
    }, [db])

    const handeOnChange = (e) => {
        setQuery(e.target.value.split(' ')[1])
        setNewMessage(e.target.value)
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();
        // if(e.target.value === `/giphy ${query}`) setGifs(false);
        if (db) {
            db.collection('messages').add({
                email: user.email,
                text: newMessage,
                createdAT: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL,
                gif
            })
        }
        setNewMessage([])
        setGifs(false)
        setGif([])
    }

    const signOut = async () => {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.info(error.message)
        }
    }

    const fecthData = async (e) => {
        e.preventDefault();

        if(e.target.value.length === 0) setGifs(true);
        
        const results = await Axios.get("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "CsSo8Lkrt4AprHIOKGEaoAPx01KO2xuj",
                q: query
            }
        });  
        setData(results.data.data)
        setGif([])
        setGifs(true);
    }
    
    const gifSearch = () => {
        return data.map(el => {
            return <div key={el.id} className="gif">
                <img src={el.images.fixed_height_small.url} alt={el.id}/>
            </div>
        })
    }

    console.info(gif)

    const detecting = (e) => {
        const result = data.filter(dat => {
            return dat.images.fixed_height_small.url === e.target.src;
        })
        setGif(result[0].images.fixed_height_small.url)
    }

    return (
        <>
            <div className="chat-container">
                <div className="container-chat">
                    <div className="header-container">
                        <h4>Chat - React</h4>
                        <div className="user-content">
                            <h6 className="name">Hola: {user.displayName === null ? user.email.split('@')[0] : user.displayName.split(' ')[0]}</h6>
                            <Button onClick={signOut} text='Sign Out'/>
                        </div>
                    </div>
                    <ul className="messages-container">
                        {messages.map(message => (
                            <li className="message" key={message.id}>
                                <Message {...message}/>
                            </li>
                        ))}
                    </ul>    
                </div>
            </div>
            <form className="form-container" onSubmit={handleOnSubmit} >
                <div className="form-input">
                    <input 
                        type="text"
                        placeholder="type your message here...."
                        value={newMessage}
                        onChange={handeOnChange}
                        required
                    />
                    {gifs && <div className="gifs-container" onClick={detecting}>{gifSearch()}</div>}
                    
                </div>
                <button className="send-button2" onClick={fecthData}>GIFS</button>
                <button className="send-button" type='submit' disabled={!newMessage}>SEND</button>
            </form>
        </>
    )
}
 
export default Channel;