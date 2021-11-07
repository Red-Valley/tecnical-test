import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import Alert from './Alert';
import CustomAvatar from './CustomAvatar';
import { loadUser } from '../utils/dbUtils';

const MyLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  space: {
    marginTop: 10,
    marginBottom: 25,
  },
  filename: {
    marginLeft: 20,
  },
  file: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: '-1px',
  }
}));

const Profile = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
  });

  const [image, setImage] = useState(null);

  const [alertMessage, setAlertMessage] = useState(null);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setImage({
      type: file.type.split('/')[1],
      file,
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAlertMessage(null);
    const { currentUser } = firebase.auth();

    if (image) {
      user.avatar = `${currentUser.uid}.${image.type}`;
      firebase.storage().ref(`/avatars/${user.avatar}`).put(image.file)
      .then(() => {
        firebase.storage().ref().child(`/avatars/${user.avatar}`)
        .getDownloadURL().then((url) => {
          setUser({ ...user, avatar: url });
        });
      });
    }

    firebase.database().ref(`/users/${currentUser.uid}`)
    .update(user)
    .then(response => {
      setAlertMessage({type: 'success', text: 'Perfil actualizado' });
    })
    .catch(error => {
      setAlertMessage({type: 'error', text: error.message });
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (firebase.auth().currentUser){
        // leer datos
        loadUser(firebase.auth().currentUser.uid)
        .then(data => { setUser(data); }
        ,(error) => {
          setAlertMessage({ type: 'error', message: error.message });
        });
      } else {
        props.history.push('/login');
      }
    }, 1000);
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          My profile
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <CustomAvatar name={user.name} avatar={user.avatar} size="xl" />
            <span className={classes.space}>{user.email}</span>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                value={user.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                accept="image/*"
                id="avatar"
                name="avatar"
                style={{ width: '1px' }}
                onChange={handleImage}
              />
              <label htmlFor="avatar">
                <Button className={classes.file} variant="contained" component="span">
                  Profile picture
                </Button>
                {image && (<span className={classes.filename}>
                  {image.file.name}
                </span>)}
              </label>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save profile
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" component={MyLink} variant="body2">
                {"Ir al Chat"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {alertMessage && 
        <Alert
          type={alertMessage.type}
          message={alertMessage.text}
          autoclose={5000}
        />
      }
    </Container>
  );
};
export default withRouter(Profile);