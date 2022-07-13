import React from "react";
import { connect } from "react-redux"
import style from "./SignUpContainer.module.scss";
import SignUpForm from "../../forms/SignUpForm/SignUpForm";
import { withRouter } from "react-router-dom";

import { userLogin } from "../../actions/user/userActions";

const SignUpContainer = ({userLogin, history}) => {
  const signUpHandler = () => {
    console.log("You've signed up");
    userLogin(true);
    history.push("/profile");
  };
  return (
    <div className={style.signUpWrap}>
      <SignUpForm handleSignUp={signUpHandler} />
    </div>
  );
};

export default withRouter(
    connect(
      null,
      {
        userLogin
      }
    )(SignUpContainer)
  );
