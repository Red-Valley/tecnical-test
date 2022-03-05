import { RootState } from "reducers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signUpRequest } from "actions/userActions";
import { namePattern, passwordPattern } from "utils/helper";

const useSignUpForm = (messages: any) => {
  const dispatch = useDispatch();
  const { pending, error } = useSelector(
    (state: RootState) => state.user
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    error && setErrorMsg(messages.errors.invalid_signup);
  }, [error, messages.errors.invalid_signup]);

  const handleSubmit = () => {
    setErrorMsg("");
    if (!username.trim() || !password.trim() || !name.trim()) {
      setErrorMsg(messages.errors.empty);
    } else if (!namePattern(name)) {
      setErrorMsg(messages.errors.invalid_name);
    } else if (!passwordPattern(password)) {
      setErrorMsg(messages.errors.invalid_password);
    } else {
      dispatch(signUpRequest({ username, password, name }));
    }
  };

  return {
    pending,

    errorMsg,
    username,
    setUsername,
    name,
    setName,
    password,
    setPassword,
    handleSubmit,
  };
};

export default useSignUpForm;
