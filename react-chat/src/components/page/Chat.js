import React, { useState, useEffect } from 'react';
import firebase from '../firebase/client'
import 'firebase/auth'
import 'firebase/firestore'

// components
import Channel from './Channel';
import Login from '../auth/Login';


const auth = firebase.auth();
const db = firebase.firestore();


const Chat = () => {

    const [user, setUser] = useState(() => auth.currentUser)

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                setUser(user)
            } else {
                setUser(null)
            }
        })
        return unsubscribe;
        // eslint-disable-next-line
    }, [])

    // console.info(user)

    return (
        <div>
            {user 
                ? <Channel user={user} db={db}/>    
                : <Login />
            }        
        </div>
    );
}
 
export default Chat;