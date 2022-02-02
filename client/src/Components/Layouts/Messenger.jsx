import { Container, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { read_cookie } from 'sfcookies';
import { CONVERSATIONS, PUSHCHAT, USERS_ALL } from '../../redux/actions';
import Conversation from '../functionals/Conversation';
import FriendList from '../functionals/FriendsList';
import MessagesList from '../functionals/MessagesList';
import { io } from 'socket.io-client'

export default function Messenger({visible}) {
    const socket = useRef()
    const dispatch = useDispatch()
    const { conversations, user, chat, chat:{chats} } = useSelector(state => state)
    const [arrived, setarrived] = useState({})
    useEffect(()=>{
        socket.current = io(import.meta.env.VITE_DOMAIN)
        
    }, [visible])

    useEffect(()=>{
        socket.current.on("getMessage", data=>{
            console.log('esta es data', data)
            dispatch( PUSHCHAT({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            }) )
            setarrived({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [socket])

    useEffect(()=>{
        arrived && chat?conversations?.[conversations.indexOf(chat.id)]?.members.includes(arrived.senderId) : false && dispatch( PUSHCHAT(arrived) )
    }, [arrived])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users=>{console.log(users)})
    }, []);



    useEffect(() => {
        dispatch(USERS_ALL())
    }, [USERS_ALL]);

    useEffect(() => {
        dispatch(CONVERSATIONS())
    }, [CONVERSATIONS]);


    return (
        <Grid container direction="row" justifyContent="center" alignItems="start">
            <Grid xs>
                <Container>
                    <MessagesList conversations={conversations} />
                </Container>
            </Grid>
            <Grid xs={6}>
                <Container>
                    <Conversation socket={socket} />
                </Container>
            </Grid>
            <Grid xs>
                <Container>
                    <FriendList />
                </Container>
            </Grid>
        </Grid>
    );
}
