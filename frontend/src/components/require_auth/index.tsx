import { RootState } from "reducers";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "routes/constants";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user }: UserState = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!user?.token) {
    return <Navigate to={ROUTES.SIGNIN} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
