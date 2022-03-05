import { RootState } from "@reducers";
import { profileRequest } from "actions/userActions";
import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STORED_TOKEN_KEY } from "utils/constants";

interface ISessionContext {
  gettingProfile: boolean;
}

const initialSession: ISessionContext = {
  gettingProfile: false,
};

export const SessionContext = createContext(initialSession);

const SessionProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const { gettingProfile }: UserState = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem(STORED_TOKEN_KEY);
      if (token) {
        dispatch(profileRequest({ token }));
      }
    })();
  }, [dispatch]);

  const value: ISessionContext = {
    gettingProfile: gettingProfile as boolean,
  };

  if (gettingProfile) {
    return <></>;
  }

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;
