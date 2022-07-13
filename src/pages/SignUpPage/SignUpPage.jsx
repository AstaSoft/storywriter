import React from "react";
// import styles from "./SignUpPage.module.scss";

import WelcomeLayout from "../../layouts/WelcomeLayout/WelcomeLayout";
import SignUpContainer from "../../containers/SignUpContainer/SignUpContainer";

const SignUpPage = () => {
  return (
    <WelcomeLayout>
      <SignUpContainer/>
    </WelcomeLayout>
  );
};

export default SignUpPage;
