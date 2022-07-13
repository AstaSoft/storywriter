import React from "react";
// import styles from "./PasswordResetPage.module.scss";

import UserPasswordResetContainer from "../../containers/UserPasswordResetContainer/UserPasswordResetContainer";
import WelcomeLayout from "../../layouts/WelcomeLayout/WelcomeLayout";

const PasswordResetPage = () => {
  return (
    <WelcomeLayout>
      <UserPasswordResetContainer />
    </WelcomeLayout>
  );
};

export default PasswordResetPage;