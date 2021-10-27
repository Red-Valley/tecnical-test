import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { disconnectUserRoom } from "../redux/actions/chatActions";
import { logoutUser } from "../redux/actions/userActions";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

interface INavbarProps {
  authenticated?: boolean;
  disconnectUserRoom: any;
  logoutUser: any;
  credentials?: any;
  users: [];
  history?: any;
}

class Navbar extends Component<INavbarProps> {
  render() {
    const { authenticated, credentials, users } = this.props;
    const logout = () => {
      this.props.logoutUser();
      leaveChatRoom();
    };
    const leaveChatRoom = () => {
      const user = users.find((x: any) => x.nickname === credentials.nickname);
      if (user) {
        this.props.disconnectUserRoom((user as any).key);
      }
    };
    return (
      <AppBar>
        <Toolbar>
          {authenticated === false && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          {authenticated === true && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/"
                onClick={leaveChatRoom}
              >
                Rooms
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
          {authenticated === false && (
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
  credentials: state.user.credentials,
  users: state.chat.users,
});

const mapActionsToProps = {
  disconnectUserRoom,
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
