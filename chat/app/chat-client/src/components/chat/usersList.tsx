import React, { Component } from "react";

import withStyles from "@mui/styles/withStyles";
import {
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { connect } from "react-redux";
import { onAddedUserRoom } from "../../redux/actions/chatActions";

const styles = (theme: any) => ({ ...theme.spread });

interface IUsersProps {
  classes?: any;
  users?: any;
  UI?: any;
  onAddedUserRoom?: any;
}

class UsersList extends Component<IUsersProps> {
  componentDidMount() {
    this.props.onAddedUserRoom(
      Array.from(this.props.users.map((x: any) => x.nickname))
    );
  }
  render() {
    const {
      classes,
      users,
      UI: { loading },
    } = this.props;
    const color = (status: any) => (status === "online" ? "green" : "red");
    const listItems = users.map((item: any, i: any) => (
      <ListItem button key={i}>
        <ListItemIcon>
          <Avatar />
        </ListItemIcon>
        <ListItemText>{item.nickname}</ListItemText>
        <ListItemText
          secondary={
            <Typography color={color(item.status)}>{item.status}</Typography>
          }
        ></ListItemText>
      </ListItem>
    ));

    return (
      <>
        {loading && <CircularProgress size={30} className={classes.progress} />}
        <List>{listItems}</List>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state.chat.users,
  UI: state.UI,
});

const mapActionsToProps = {
  onAddedUserRoom,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapActionsToProps)(UsersList)
);
