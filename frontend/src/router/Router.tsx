import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from 'pages/chat'
import Login from 'pages/login'
import Register from 'pages/register'

export const Router: React.FC = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  </BrowserRouter>
)
