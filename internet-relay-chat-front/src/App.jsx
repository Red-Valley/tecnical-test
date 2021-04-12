import React from "react";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login/LoginMainView";
import Dashboard from "./components/Dashboard/DashboardMainView";
import routes from "./routes/local";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={[routes.home, routes.login]} component={Login} exact />
        <Route path={routes.dashboard} component={Dashboard} exact />
      </BrowserRouter>
    </div>
  );
}

export default App;
