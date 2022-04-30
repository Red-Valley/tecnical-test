import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from "react-router-dom";
import { RootState } from '../store/store';
import ChatPage from '../pages/ChatPage';
import RoomsPage from '../pages/RoomsPage';

export default function RoomsRouter() {
  const authState = useSelector((state: RootState) => state.auth);

  return authState.authenticated ? (
    <Routes>
      <Route path="/" element={<RoomsPage />} />
      <Route path=":id" element={<ChatPage />} />
    </Routes>
  ) : (
    <Navigate to="/auth/login" />
  )
};
