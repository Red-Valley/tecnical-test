import {
  Card,
  Box,
  Container,
  CardActions,
  CardContent,
  Button,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { styles } from "./styles";
import { globalStyles } from "utils/styles";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "routes/constants";
import { useI18n } from "hooks/useI18n";
import useSignInForm from "./useSignInForm";
import { useEffect } from "react";
import { STORED_TOKEN_KEY } from "utils/constants";
import { RootState } from "reducers";
import { useSelector } from "react-redux";

const SigninPage = () => {
  const { locale, messages } = useI18n();
  const { signin } = messages[locale];

  const { user }: UserState = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORED_TOKEN_KEY, user.token || "");
      navigate(ROUTES.CHAT_ROOM);
    }
  }, [user, navigate]);

  const {
    pending,
    errorMsg,
    username,
    setUsername,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    handleSubmit,
  } = useSignInForm(signin);

  return (
    <Container maxWidth="sm">
      <Box component="form" sx={globalStyles.boxContainer}>
        <Card sx={styles.cardWrapper}>
          <CardContent sx={styles.cardContent}>
            <AccountCircleIcon sx={{ fontSize: "5rem" }} />
            <FormControl sx={globalStyles.fullWidth} variant="standard">
              <InputLabel htmlFor="signin-username">
                {signin.form.user_label}
              </InputLabel>
              <Input
                id="signin-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl sx={globalStyles.fullWidth} variant="standard">
              <InputLabel htmlFor="signin-password">
                {signin.form.pass_label}
              </InputLabel>
              <Input
                id="signin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={passwordVisible ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              disabled={pending}
              sx={globalStyles.fullWidth}
              size="medium"
              variant="contained"
              onClick={handleSubmit}
            >
              {signin.form.submit}
            </Button>
            {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
          </CardContent>
          <CardActions sx={styles.cardActions}>
            <Button size="small" disabled={pending}>
              <Link to={ROUTES.SIGNUP}>{signin.form.signup}</Link>
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default SigninPage;
