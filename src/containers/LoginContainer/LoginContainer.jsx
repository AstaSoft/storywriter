import React from "react";
import style from "./LoginContainer.module.scss"
import SignInForm from "../../forms/SignInForm/SignInForm"

const LoginContainer = () => {
  return (
    <div className={style.signInFormWrap}>
        <SignInForm/>
    </div>
  );
};

export default LoginContainer;
