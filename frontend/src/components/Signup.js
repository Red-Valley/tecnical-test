import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import { API_URL } from '../constants';
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/stores/Auth/Auth';
import { TYPES } from '../types';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();
  const { userState, dispatch } = useAuth();

  const setCurrentUser = (user, isAuthenticated, followers) => {
    return {
      type: TYPES.SET_CURRENT_USER,
      payload: { user, isAuthenticated, followers }
    };
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);
    const dataToSave = {
      firstName: data.get('FirstName'),
      lastName: data.get('LastName'),
      idNumber: data.get('IdentificationNumber'),
      idType: data.get('IDtype'),
      address: data.get('Address'),
      phoneNumber: data.get('PhoneNumber'),
    };
    const currentUser = await axios.post(`${API_URL}/users/register`,dataToSave)
    const followers = await axios.get(`${API_URL}/followers/${currentUser.data._id}`)
    setLoading(false)
    const stateToUpdate = {
      user: currentUser.data,
      isAuthenticated: true,
      followers: followers.data
    }
    dispatch(setCurrentUser(currentUser.data, true, followers.data))
    console.log("🚀 ~ file: Signup.js ~ line 67 ~ handleSubmits ~ userState", userState)
    localStorage.setItem('userState', JSON.stringify(stateToUpdate));
    navigate("/dashboard");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="FirstName"
                autoComplete="off"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="LastName"
                label="Last Name"
                autoComplete="off"
                id="LastName"
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="IdentificationNumber"
                label="Identification number"
                name="IdentificationNumber"
                
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="IDtype"
                label="ID Type"
                name="IDtype"
                
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Address"
                label="Address"
                name="Address"
                
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="PhoneNumber"
                label="Phone number"
                name="PhoneNumber"
                
                
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Register'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
