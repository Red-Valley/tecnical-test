import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from "react-router-dom";
import { RootState } from '../store/store';
import AuthPage from '../pages/AuthPage';

export default function AuthRouter() {

  const authState = useSelector((state: RootState) => state.auth);

  return !authState.authenticated ? (
    <Routes>
      <Route path="login" element={<AuthPage as='login'/>} />
      <Route path="register" element={<AuthPage as='register'/>} />
    </Routes>
  ) : (
    <Navigate to="/rooms" />
  )
};
