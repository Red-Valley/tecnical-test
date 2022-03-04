import {
  Card,
  Box,
  Container,
  CardActions,
  CardContent,
  Button,
  Input,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { styles } from "screens/signin/styles";
import { globalStyles } from "utils/styles";
import { ROUTES } from "routes/constants";
import { Link } from "react-router-dom";
import { useI18n } from "hooks/useI18n";
import useSignUpForm from "./useSignUpForm";

const SignupPage = () => {
  const { locale, messages } = useI18n();
  const { signup } = messages[locale];

  const {
    pending,
    // user,

    errorMsg,
    username,
    setUsername,
    name,
    setName,
    password,
    setPassword,
    handleSubmit,
  } = useSignUpForm(signup);

  return (
    <Container maxWidth="sm">
      <Box component="form" sx={globalStyles.boxContainer}>
        <Card sx={styles.cardWrapper}>
          <CardContent sx={styles.cardContent}>
            <AccountCircleIcon sx={{ fontSize: "5rem" }} />
            <FormControl sx={globalStyles.fullWidth} variant="standard">
              <InputLabel htmlFor="signup-username">
                {signup.form.user_label}
              </InputLabel>
              <Input
                id="signup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl sx={globalStyles.fullWidth} variant="standard">
              <InputLabel htmlFor="signup-name">
                {signup.form.name_label}
              </InputLabel>
              <Input
                id="signup-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl sx={globalStyles.fullWidth} variant="standard">
              <InputLabel htmlFor="signup-password">
                {signup.form.pass_label}
              </InputLabel>
              <Input
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Button
              disabled={pending}
              sx={globalStyles.fullWidth}
              size="medium"
              variant="contained"
              onClick={handleSubmit}
            >
              {pending ? `${signup.form.signing_up}...` : signup.form.submit}
            </Button>
            {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
          </CardContent>
          <CardActions sx={styles.cardActions}>
            <Button size="small" disabled={pending}>
              <Link to={ROUTES.SIGNIN}>{signup.form.signin}</Link>
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default SignupPage;
