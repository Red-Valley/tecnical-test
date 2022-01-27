import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store/store";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";


import './App.css';

function App() {
  return (
    <Provider store={store}>
    <Layout>
      <BrowserRouter>
        <Routes>
        <Route path="/home" element={<Home />} />       
          <Route path="/login" element={<Login />} />                      
          <Route path="/chatRoom"  element={<ChatRoom />} />     
        </Routes>
      </BrowserRouter>
    </Layout>
  </Provider>
  );
}

export default App;
