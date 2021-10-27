import React, { Component } from "react";

import withStyles from "@mui/styles/withStyles";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import { connect } from "react-redux";
import { sendMessage } from "../../redux/actions/chatActions";

import ChatInput from "./chatInput";
import Messages from "./messages";
import UsersList from "./usersList";

const styles = (theme: any) => ({
  ...theme.spread,
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
});

interface IRoomProps {
  classes?: any;
  credentials?: any;
  authenticated?: boolean;
  sendMessage?: any;
  chat?: any;
}

interface State {
  errors: string;
}

class Room extends Component<IRoomProps, State> {
  state: State = {
    errors: "",
  };
  handleSubmit = (message: string, event: any) => {
    event.preventDefault();
    this.props.sendMessage({
      nickname: this.props.credentials.nickname,
      message: message,
      created: new Date().toISOString(),
      type: "message",
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <UsersList />
        </Grid>
        <Grid item xs={9}>
          <Messages />
          <Divider />
          <ChatInput onSend={this.handleSubmit} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => ({
  credentials: state.user.credentials,
  chat: state.chat,
});

const mapActionsToProps = {
  sendMessage,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapActionsToProps)(Room)
);
