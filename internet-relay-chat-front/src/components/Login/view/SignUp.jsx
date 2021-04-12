import React from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import useLogin from "../Core/customHooks/useLogin";
import styles from "../styles.module.scss";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  "@media screen and (min-width: 1024px)": {
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -50,
      marginLeft: -30,
    },
  },
  "@media screen and (min-width: 768px) and (max-width: 1023px)": {
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -80,
      marginLeft: -30,
    },
  },
  "@media screen and (max-width: 767px)": {
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -60,
      marginLeft: -30,
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { signUp, handleChangeSignInData, loading } = useLogin();
  return (
    <div className={styles.formSingUp}>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Sign up for free!
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Nickname"
        type="text"
        onChange={handleChangeSignInData("nickname")}
      />
      <TextField
        variant="outlined"
        placeholder="Full Name"
        type="text"
        onChange={handleChangeSignInData("fullName")}
      />
      <TextField
        variant="outlined"
        placeholder="E-mail"
        type="text"
        onChange={handleChangeSignInData("email")}
      />
      <TextField
        variant="outlined"
        placeholder="Password"
        type="password"
        onChange={handleChangeSignInData("password")}
      />
      <TextField
        variant="outlined"
        placeholder="Repeat password"
        type="password"
        onChange={handleChangeSignInData("rePassword")}
      />
      <div className={styles.wrapper}>
        <Button color="secondary" fullWidth onClick={signUp} disabled={loading}>
          Sign Up
        </Button>
        {loading && (
          <CircularProgress size={50} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
