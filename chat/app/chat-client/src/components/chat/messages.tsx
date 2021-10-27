import React, { Component } from "react";

import withStyles from "@mui/styles/withStyles";

import {
  List,
  ListItem,
  ListItemText,
  Grid,
  CircularProgress,
} from "@mui/material";

import { connect } from "react-redux";
import { onAddedMessages } from "../../redux/actions/chatActions";

import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");

const styles = (theme: any) => ({
  ...theme.spread,
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

interface IMessagesProps {
  classes?: any;
  chat?: any;
  credentials?: any;
  onAddedMessages?: any;
  UI?: any;
}

class Messages extends Component<IMessagesProps> {
  componentDidMount() {
    this.props.onAddedMessages();
  }
  render() {
    dayjs.extend(localizedFormat);
    const {
      classes,
      chat: { messages },
      UI: { loading },
      credentials,
    } = this.props;
    const align = (nickname: any) =>
      credentials.nickname === nickname ? "flex-end" : "flex-start";
    const listItems = messages.map((item: any, i: any) => (
      <ListItem key={i}>
        <Grid
          container
          direction="column"
          justifyContent={align(item.nickname)}
          alignItems={align(item.nickname)}
        >
          <ListItemText primary={item.message}></ListItemText>
          <ListItemText
            secondary={`${dayjs(item.created).format("LLL")} - ${
              item.nickname
            }`}
          ></ListItemText>
        </Grid>
      </ListItem>
    ));

    return (
      <>
        {loading && <CircularProgress size={30} className={classes.progress} />}
        <List className={classes.messageArea}>{listItems}</List>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  chat: state.chat,
  credentials: state.user.credentials,
  UI: state.UI,
});

const mapActionsToProps = {
  onAddedMessages,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapActionsToProps)(Messages)
);
