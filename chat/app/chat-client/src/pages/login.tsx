import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import RVBlackIcon from "../images/RV-black.svg";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

import { Link } from "react-router-dom";

interface ILoginProps {
  classes: any;
  history: any;
  loginUser: any;
  UI: any;
  user: any;
}

interface State {
  email: string;
  password: string;
  errors: string;
}

const styles = (theme: any) => ({ ...theme.spread });

class login extends Component<ILoginProps, State> {
  state: State = {
    email: "",
    password: "",
    errors: "",
  };
  isValid = () => {
    return this.state.email && this.state.password;
  };
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.UI.errors !== this.state.errors) {
      this.setState({ errors: prevProps.UI.errors });
    }
  }
  handleSubmit = (event: any) => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.loginUser(
        { email: this.state.email, password: this.state.password },
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
          <br />
          <br />
          <br />
          <img src={RVBlackIcon} alt="Red Valley" className={classes.image} />
          <br />
          <br />
          <form noValidate onSubmit={this.handleSubmit}>
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
            {errors && errors.length > 0 && (
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
              dont have an account ? sign up <Link to="/signup">here</Link>
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
  loginUser,
};

export default withStyles(styles)(
  connect(mapStateToProps, mapActionsToProps)(login)
);
