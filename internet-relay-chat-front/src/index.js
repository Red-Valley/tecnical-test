import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./theme";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
