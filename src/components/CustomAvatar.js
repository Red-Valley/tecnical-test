import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  sm: {
    width: 28,
    height: 28
  },
  md: {
    width: 42,
    height: 42
  },
  lg: {
    width: 64,
    height: 64
  },
  xl: {
    width: 84,
    height: 84
  },
  bg: {
    backgroundColor: '#ff5722'
  }
});

const CustomAvatar = ({ name, avatar, size }) => {
  const classes = useStyles();

  return (
    <Avatar
      alt={name}
      src={avatar}
      className={clsx(classes[size], !avatar ? classes.bg : null)}
    >
      {!avatar ? name.charAt(0) : null}
    </Avatar>
  );
};

CustomAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']).isRequired
};

export default CustomAvatar;
