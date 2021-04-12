import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import useLogin from "./Core/customHooks/useLogin";
import Login from "./view/Login";
import SignUp from "./view/SignUp";
import styles from "./styles.module.scss";

export default function LoginMainView() {
  const { stepValue, handleSetStepValue } = useLogin();
  return (
    <div className={styles.container}>
      <div className={stepValue === 0 ? styles.loginBox : styles.signUpBox}>
        <BottomNavigation
          value={stepValue}
          onChange={(_event, newValue) => {
            handleSetStepValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction label="Sign In" icon={<VpnKeyIcon />} />
          <BottomNavigationAction label="Sign Up" icon={<LockOpenIcon />} />
        </BottomNavigation>
        {stepValue === 0 ? <Login /> : <SignUp />}
      </div>
    </div>
  );
}
