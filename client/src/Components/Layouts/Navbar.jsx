import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CommentBankIcon from '@mui/icons-material/CommentBank';import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR } from '../../redux/actions';

export default function ButtonAppBar() {
  const {user} = useSelector(state=>state)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogOut = async () =>{
    dispatch(CLEAR())
    navigate('/')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{zIndex: 14000}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CommentBankIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Qickly
          </Typography>
          {
            user._id?
          <Button color="inherit" onClick={handleLogOut}>LogOut</Button> 
            :
            <>
          <Link to="" style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Login</Button></Link> 
          <Link to="register" style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Register</Button></Link> 
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}