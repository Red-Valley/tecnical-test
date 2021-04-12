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
      marginTop: -135,
      marginLeft: -30,
    },
  },
  "@media screen and (min-width: 768px) and (max-width: 1023px)": {
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -120,
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

export default function Login() {
  const classes = useStyles();
  const { login, handleChangeLoginData, loading } = useLogin();
  return (
    <div className={styles.form}>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        IRC
      </Typography>
      <TextField
        variant="outlined"
        placeholder="E-mail"
        type="text"
        onChange={handleChangeLoginData("email")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            login();
          }
        }}
      />
      <TextField
        variant="outlined"
        placeholder="Password"
        type="password"
        onChange={handleChangeLoginData("password")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            login();
          }
        }}
      />

      <div className={styles.wrapper}>
        <Button color="secondary" onClick={login} disabled={loading}>
          Sign In
        </Button>
        {loading && (
          <CircularProgress size={50} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
