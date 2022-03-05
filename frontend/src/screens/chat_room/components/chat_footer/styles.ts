import { globalStyles } from "utils/styles";

export const styles = {
  footerContainer: { p: 2, bgcolor: "var(--primary)", color: "#fff" },
  footerForm: {
    ...globalStyles.fullWidth,
    color: "var(--fourth)",
  },
  footerFormElement: { color: "var(--third)" },
};
