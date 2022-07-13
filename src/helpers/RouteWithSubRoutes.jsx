import React from "react";
import { Route, Redirect } from "react-router-dom";
import { load } from "./localStorage";
import { paths } from "../routes/paths";
import { withRouter } from "react-router-dom";

const RouteWithSubRoutes = ({ exact, path, routes, Component, history }) => {
  const isToken = load("token");

  if (
    !isToken &&
    history.location.pathname !== paths.login &&
    history.location.pathname !== paths.registration &&
    history.location.pathname !== paths.passwordRecovery &&
    history.location.pathname !== paths.resetPassword
  ) {
    return <Redirect to={paths.login} />;
  }

  if (
    isToken &&
    (history.location.pathname === paths.login ||
      history.location.pathname === paths.registration ||
      history.location.pathname === paths.passwordRecovery ||
      history.location.pathname === paths.resetPassword)
  ) {
    return <Redirect to={paths.homepage} />;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => <Component {...props} routes={routes} />}
    />
  );
};

export default withRouter(RouteWithSubRoutes);
