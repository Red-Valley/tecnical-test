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
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { styles } from "screens/signin/styles";
import { globalStyles } from "utils/styles";
import { ROUTES } from "routes/constants";
import { Link } from "react-router-dom";
import { useI18n } from "hooks/useI18n";

const SignupPage = () => {
    const { locale, messages } = useI18n();
  const { signup } = messages[locale];

  return (
    <Container maxWidth="sm">
      <Box component="form" sx={globalStyles.boxContainer}>
        <Card sx={styles.cardWrapper}>
          <CardContent sx={styles.cardContent}>
            <AccountCircleIcon sx={{ fontSize: "5rem" }} />
            <FormControl sx={globalStyles.fullWidth} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
              {signup.form.user_label}
              </InputLabel>
              <Input />
            </FormControl>
            <FormControl sx={globalStyles.fullWidth} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
              {signup.form.fullname_label}
              </InputLabel>
              <Input />
            </FormControl>
            <FormControl sx={globalStyles.fullWidth} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
              {signup.form.pass_label}
              </InputLabel>
              <Input
                type="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility">
                      <Visibility />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button sx={globalStyles.fullWidth} size="medium" variant="contained">
            {signup.form.submit}
            </Button>
          </CardContent>
          <CardActions sx={styles.cardActions}>
            <Button size="small"><Link to={ROUTES.SIGNIN}>{signup.form.signin}</Link></Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default SignupPage;
