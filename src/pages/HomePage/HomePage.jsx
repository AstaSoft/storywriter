import React from "react";
import { Redirect } from "react-router-dom";
import withUserInfo from "../../hoc/withUserInfo";
// import ProfilePage from "../ProfilePage/ProfilePage"
import { paths } from "../../routes/paths";

const HomePage = ({ userInfo: { token } }) => {
  switch (token) {
    case token:
      return <Redirect to={paths.profile} />;
    default:
      return <Redirect to={paths.profile} />;
  }
};

export default withUserInfo(HomePage);
