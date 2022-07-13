import React from "react";
// import styles from "./PasswordRecoveryPage.module.scss";

import UserPasswordRecoveryContainer from "../../containers/UserPasswordRecoveryContainer/UserPasswordRecoveryContainer";
import WelcomeLayout from "../../layouts/WelcomeLayout/WelcomeLayout";

const PasswordRecoveryPage = () => {
  return (
    <WelcomeLayout>
      <UserPasswordRecoveryContainer />
    </WelcomeLayout>
  );
};

export default PasswordRecoveryPage;