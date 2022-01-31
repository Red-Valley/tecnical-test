import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store/store";

import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
<<<<<<< HEAD
import Login from "./features/Home/Login";
=======
>>>>>>> dev
import ChatRoom from "./pages/ChatRoom/ChatRoom";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route  element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/chatRoom" element={<ChatRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
