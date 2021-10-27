import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

interface IAuthRoteProps {
  component: any;
  authenticated?: boolean;
  path?: string | readonly string[] | undefined;
  user?: any;
}

const AuthRote: React.FunctionComponent<IAuthRoteProps> = ({
  component,
  authenticated,
  path,
}) => {
  return (
    <Route
      render={() =>
        authenticated === true ? (
          <Redirect to="/" />
        ) : (
          <Route exact path={path} component={component} />
        )
      }
    ></Route>
  );
};

const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRote);
