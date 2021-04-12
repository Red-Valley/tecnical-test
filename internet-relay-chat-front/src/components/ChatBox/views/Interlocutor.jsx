import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import styles from "../styles.module.scss";

export default function Interlocutor({ message }) {
  return (
    <div className={styles.interlocutorContainer}>
      <Typography variant="caption">{message}</Typography>
    </div>
  );
}

Interlocutor.propTypes = {
  message: PropTypes.string.isRequired,
};
