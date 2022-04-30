import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthRouter from "./router/AuthRouter";
import RoomsRouter from "./router/RoomsRouter";
import { RootState } from "./store/store";

const App: React.FC = () => {
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    localStorage.setItem("141274-session", JSON.stringify(authState));
  }, [authState]);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="auth/*" element={<AuthRouter />} />
        <Route path="rooms/*" element={<RoomsRouter />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
