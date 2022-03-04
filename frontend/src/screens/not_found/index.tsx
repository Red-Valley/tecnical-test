import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/constants";

const NotFoundPage = () => {
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
        >
            <Grid item xs>
                <h1>404</h1>
                <Link to={ROUTES.SIGNIN} replace>Go to main page</Link>
            </Grid>
        </Grid>
    )
}

export default NotFoundPage;