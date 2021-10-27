import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import RVBlackIcon from "../images/RV-black.svg";

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

import { Link } from "react-router-dom";

interface ISignupProps {
  classes: any;
  history: any;
  UI: any;
  user: any;
  signupUser: any;
}

interface State {
  nickname: string;
  email: string;
  password: string;
  confirmpassword: string;
  errors: string;
}

const styles = (theme: any) => ({ ...theme.spread });

class signup extends Component<ISignupProps, State> {
  state: State = {
    nickname: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: "",
  };
  isValid = () => {
    return (
      this.state.nickname &&
      this.state.email &&
      this.state.password &&
      this.state.confirmpassword &&
      this.state.password === this.state.confirmpassword
    );
  };
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.UI.errors !== this.state.errors) {
      this.setState({ errors: prevProps.UI.errors });
    }
  }
  handleSubmit = (event: any) => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.signupUser(
        {
          nickname: this.state.nickname,
          email: this.state.email,
          password: this.state.password,
          confirmpassword: this.state.confirmpassword,
        },
        this.props.history
      );
    }
  };
  handleChange = (event: any) => {
    event.preventDefault();
    let target = event.target as HTMLInputElement;
    const { name, value } = target;
    this.setState((state) => ({ ...state, [name]: value }));
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={RVBlackIcon} alt="Red Valley" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="nickname"
              name="nickname"
              type="email"
              label="Nickname"
              error={this.state.nickname.length > 0 ? false : true}
              helperText={
                this.state.nickname.length > 0 ? "" : "Nickname is required"
              }
              className={classes.textField}
              value={this.state.nickname}
              fullWidth
              onChange={this.handleChange}
            ></TextField>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              error={this.state.email.length > 0 ? false : true}
              helperText={
                this.state.email.length > 0 ? "" : "Email is required"
              }
              className={classes.textField}
              value={this.state.email}
              fullWidth
              onChange={this.handleChange}
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              error={this.state.password.length > 0 ? false : true}
              helperText={
                this.state.password.length > 0 ? "" : "Password is required"
              }
              className={classes.textField}
              value={this.state.password}
              fullWidth
              onChange={this.handleChange}
            ></TextField>
            <TextField
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              label="Confirm password"
              error={this.state.confirmpassword.length > 0 ? false : true}
              helperText={
                this.state.confirmpassword.length > 0
                  ? ""
                  : "Confirm password is required"
              }
              className={classes.textField}
              value={this.state.confirmpassword}
              fullWidth
              onChange={this.handleChange}
            ></TextField>
            {errors.length > 0 && (
              <Typography variant="body2" className={classes.customError}>
                {errors}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.buttom}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
            <small>
              Already have an account ? login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapActionsToProps)(signup)
);
