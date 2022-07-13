import React, {useState} from "react";
import style from "./UserPasswordResetContainer.module.scss";
import ResetPasswordForm from "../../forms/ResetPasswordForm/ResetPasswordForm";

const UserPasswordResetContainer = () => {
  const [showResetInfo, setShowResetInfo] = useState(false);

  const handleChange = (isShow) => {
    setShowResetInfo(isShow);
  }

  return (
    <div className={style.passwordResetFormWrap}>
        <ResetPasswordForm showResetInfo={showResetInfo} handleChange={handleChange}/>
    </div>
  );
};

export default UserPasswordResetContainer;
