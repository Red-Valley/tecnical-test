import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_UNAUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

import axios from "axios";

import jwtDecode from "jwt-decode";

import "./App.css";

import Navbar from "./components/navbar";

import home from "./pages/home";
import chat from "./pages/chat";
import login from "./pages/login";
import signup from "./pages/signup";

import style from "./utils/theme";
import AuthRote from "./utils/authRote";

axios.defaults.baseURL = "http://127.0.0.1:5001/redvalley-chat/us-central1/api";

const theme = createTheme(style);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_UNAUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
} else {
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

class App extends Component<{}> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className="container">
              <Navbar />
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/chat" component={chat} />
                <AuthRote path="/login" component={login} />
                <AuthRote path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
