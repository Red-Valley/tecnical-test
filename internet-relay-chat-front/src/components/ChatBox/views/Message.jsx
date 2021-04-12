import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import useImg from "../Core/CustomHooks/useImg";
import { Avatar, Typography } from "@material-ui/core";
import styles from "../styles.module.scss";

export default function Message({
  incomingMsg = true,
  message,
  nickname,
  date,
  isImage = false,
}) {
  const { parseMessage } = useImg(message);
  return (
    <div className={styles.internalContainer}>
      {incomingMsg ? (
        <div className={styles.messageContainer}>
          <Avatar alt={nickname} src={nickname} />
          <div className={styles.message}>
            <Typography variant="caption" component="p" color="textPrimary">
              {nickname} -
              {moment(date, "HH:MM - DD/MM/YYYY").format("HH:MM - DD/MM/YYYY")}
            </Typography>
            {isImage ? (
              <img src={parseMessage} className={styles.image} />
            ) : (
              <Typography variant="body1" component="p" gutterBottom>
                {message}
              </Typography>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.messageContainerSended}>
          <div className={styles.messageSended}>
            <Typography
              variant="caption"
              className={styles.rightText}
              component="p"
              color="textPrimary"
              align="right"
            >
              {nickname} -{date}
            </Typography>
            {isImage ? (
              <img src={parseMessage} className={styles.image} />
            ) : (
              <Typography
                variant="body1"
                className={styles.rightText}
                component="p"
                align="right"
                gutterBottom
              >
                {message}
              </Typography>
            )}
          </div>
          <Avatar alt={nickname} src={nickname} />
        </div>
      )}
    </div>
  );
}

Message.propTypes = {
  incomingMsg: PropTypes.bool,
  message: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isImage: PropTypes.bool,
};
