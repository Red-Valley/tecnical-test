import {
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";
import NotFoundPage from "screens/not_found";
import SignupPage from "screens/signup";
import SigninPage from "screens/signin";
import { ROUTES } from "./constants";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
                <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;