import React from "react";
import { Avatar, IconButton, Tooltip, Typography } from "@material-ui/core";
import useUser from "./Core/CustomHooks/useUser";
import Dots from "./views/dots";
import styles from "./styles.module.scss";

export default function UserMainView() {
  const { user } = useUser();
  return (
    <div className={styles.userContainer}>
      <div className={styles.options}>
        <div className={styles.avatar}>
          <Tooltip title={user.nickname} placement="left">
            <IconButton>
              <Avatar alt={user.nickname} src={user.avatar || user.nickname} />
            </IconButton>
          </Tooltip>
        </div>
        <Dots />
        <div className={styles.title}>
          <Typography variant="h5" component="h6" align="center">
            Internet Relay Chat
          </Typography>
        </div>
      </div>
    </div>
  );
}
