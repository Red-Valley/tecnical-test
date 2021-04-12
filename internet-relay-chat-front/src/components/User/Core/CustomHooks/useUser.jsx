import { useSnackbar } from "notistack";
import Cookies from "universal-cookie";
import useLogin from "../../../Login/Core/customHooks/useLogin";

export default function useUser() {
  const cookies = new Cookies();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useLogin();

  const handleSelectOption = async (e) => {
    const opt = e.target.getAttribute("value");
    switch (opt) {
      case "Logout":
        await logout();
        break;

      case "Change Avatar":
        enqueueSnackbar("Function not available yet...", {
          variant: "warning",
        });
        break;

      default:
        break;
    }
  };

  return { user: { nickname: cookies.get("nickname") }, handleSelectOption };
}
