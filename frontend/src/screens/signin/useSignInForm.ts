import { RootState } from "reducers";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest } from "actions/userActions";
import { useEffect, useState } from "react";

const useSignInForm = (messages: any) => {
  const dispatch = useDispatch();
  const { pending, user, error } = useSelector(
    (state: RootState) => state.user
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    error && setErrorMsg(messages.errors.invalid_credentials)
  }, [error, messages.errors.invalid_credentials])

  const handleSubmit = () => {
    setErrorMsg('');
    if(!username.trim() || !password.trim()) {
      setErrorMsg(messages.errors.empty);
    } else {
      dispatch(signInRequest({ username, password }));
    }
  };
  return {
    pending,
    user,
    error,

    errorMsg,
    username,
    setUsername,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    handleSubmit,
  };
};

export default useSignInForm;
