import React, { Component } from "react";

import withStyles from "@mui/styles/withStyles";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import { connect } from "react-redux";

const styles = (theme: any) => ({
  ...theme.spread,
  typeSomething: {
    padding: "20px",
  },
});

interface IChatInputProps {
  onSend: (messae: string, event: any) => void;
  classes?: any;
  UI?: any;
}

interface State {
  message: string;
}

class ChatInput extends Component<IChatInputProps, State> {
  state: State = {
    message: "",
  };
  handleSubmit = (event: any) => {
    event.preventDefault();
    if (this.state.message) {
      this.props.onSend(this.state.message, event);
      this.setState({ message: "" });
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
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <Grid
          container
          className={classes.typeSomething}
          alignContent="flex-end"
          alignItems="flex-end"
          direction="column"
        >
          <TextField
            id="message"
            name="message"
            type="message"
            label="Type Something"
            className={classes.textField}
            value={this.state.message}
            fullWidth
            onChange={this.handleChange}
          ></TextField>
          <Button
            type="submit"
            color="primary"
            className={classes.buttom}
            variant="contained"
          >
            Send
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = (state: any) => ({
  UI: state.UI,
});

export default withStyles(styles)(connect(mapStateToProps)(ChatInput));
