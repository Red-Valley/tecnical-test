import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import * as authActions from "../actions/authActions";
import { AppDispatch } from '../store/store';
import Button from './Button';

const LogoutButton: React.FC = () => {
  const dispach = useDispatch<AppDispatch>();

  function handleClick() {
    dispach(authActions.logout())
  }

  return (
    <Box 
      margin={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button onClick={handleClick} variant='contained'>Salir</Button>
    </Box>
  )
}

export default LogoutButton;