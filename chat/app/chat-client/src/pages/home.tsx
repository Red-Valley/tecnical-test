import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import RVBlackIcon from "../images/RV-black.svg";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";

import { connect } from "react-redux";
import { connectUserRoom } from "../redux/actions/chatActions";

const styles = (theme: any) => ({ ...theme.spread });

interface IHomeProps {
  classes: any;
  history: any;
  connectUserRoom: any;
  credentials?: any;
  users: [];
}

class home extends Component<IHomeProps> {
  render() {
    const { classes, credentials, users } = this.props;
    const enterChatRoom = () => {
      const user = users.find((x: any) => x.nickname === credentials.nickname);
      if (!user) {
        this.props.connectUserRoom({
          nickname: credentials.nickname,
          status: "online",
        });
      }
    };
    return (
      <>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <br />
            <br />
            <img src={RVBlackIcon} alt="Red Valley" className={classes.image} />
            <br />
            <br />
            <br />
          </Grid>
          <Grid item sm />
        </Grid>
        <Grid container className={classes.form} direction="column">
          <Grid item sm>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="RVStaffing | Full time"
                height="140"
                image="https://img.zohostatic.com/recruit/ZR_V5_Oct_26_2021/images/cover3.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Full Stack Developer Lizards are a widespread group of
                  squamate reptiles, with over 6,000 species, ranging across all
                  continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="large">
                  Remote Job | Posted |
                  <Link to="/chat" onClick={enterChatRoom}>
                    Open chat Here
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
  credentials: state.user.credentials,
  users: state.chat.users,
});

const mapActionsToProps = {
  connectUserRoom,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapActionsToProps)(home)
);
