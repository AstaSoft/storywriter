import React from "react";
// import styles from "./LoginPage.module.scss";

import LoginContainer from "../../containers/LoginContainer/LoginContainer";
import WelcomeLayout from "../../layouts/WelcomeLayout/WelcomeLayout";

const LoginPage = () => {
  return (
    <WelcomeLayout>
      <LoginContainer/>
    </WelcomeLayout>
  );
};

export default LoginPage;
