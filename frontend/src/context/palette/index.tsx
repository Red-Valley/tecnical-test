import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#075e54",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2a3942",
      contrastText: "#fff",
    },
  },
});

export default function Palette({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
