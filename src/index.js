import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Register } from "./routes/Register";
import { Dashboard } from "./routes/Dashboard";
import { AuthContextProvider } from "./context/stores/Auth/AuthContext";
ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        {/* <App /> */}
        <Routes>
          {/* <Route path="/" element={<App />}> */}
          <Route path="signup" element={<Register />} />
          <Route path="Dashboard" element={<Dashboard />} />
          {/* </Route> */}
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </AuthContextProvider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
