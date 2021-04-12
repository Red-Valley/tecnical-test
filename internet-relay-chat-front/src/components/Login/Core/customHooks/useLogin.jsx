import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callService } from "../../../../services";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import {
  setLoading,
  setLoginInformation,
  setSingUpInformation,
  setStepValue,
  SIGN_UP_DEFAULT,
} from "../actions";
import local from "../../../../routes/local";
import Cookies from "universal-cookie";
import services from "../../../../routes/service";

export default function useLogin() {
  const {
    loginInformation,
    signUpInformation,
    loading,
    stepValue,
  } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (cookies.get("accessToken") && cookies.get("userId")) {
      history.push(local.dashboard);
    }
  }, []);

  const handleChangeLoginData = (name) => (e) => {
    dispatch(
      setLoginInformation({ ...loginInformation, [name]: e.target.value })
    );
  };

  const handleChangeSignInData = (name) => (e) => {
    dispatch(
      setSingUpInformation({ ...signUpInformation, [name]: e.target.value })
    );
  };

  const signUp = async () => {
    try {
      dispatch(setLoading(true));
      await callService(services.signUp, "POST", {
        ...signUpInformation,
      });
      dispatch(setStepValue(0));
      dispatch(setSingUpInformation(SIGN_UP_DEFAULT));
      dispatch(setLoading(false));
      enqueueSnackbar("Let's to sign in!", { variant: "success" });
    } catch (error) {
      dispatch(setLoading(false));
      throw enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const login = async () => {
    try {
      dispatch(setLoading(true));
      const response = await callService(services.signIn, "POST", {
        ...loginInformation,
      });
      cookies.set("accessToken", response.data.accessToken);
      cookies.set("userId", response.data.userId);
      cookies.set("nickname", response.data.nickname);
      history.push(local.dashboard);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const logout = async () => {
    try {
      await callService(services.logout, "POST", {
        token: cookies.get("accessToken"),
      });
      cookies.remove("accessToken");
      cookies.remove("userId");
      cookies.remove("nickname");
      history.push(local.home);
    } catch (error) {
      throw enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const handleSetStepValue = (newValue) => {
    dispatch(setStepValue(newValue));
  };

  return {
    login,
    signUp,
    logout,
    handleChangeLoginData,
    handleChangeSignInData,
    stepValue,
    handleSetStepValue,
    loading,
  };
}
