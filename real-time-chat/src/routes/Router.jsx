import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//my components
import Login from '../pages/login/Login';
import Chat from '../pages/chat/Chat';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chat-room" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}
