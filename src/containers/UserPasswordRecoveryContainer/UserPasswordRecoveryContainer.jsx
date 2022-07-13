import React, {useState} from "react";
import style from "./UserPasswordRecoveryContainer.module.scss";
import PasswordRecoveryForm from "../../forms/PasswordRecoveryForm/PasswordRecoveryForm";

const UserPasswordRecoveryContainer = () => {
  const [showRecoveryInfo, setShowRecoveryInfo] = useState(false);

  const handleChange = (isShow) => {
    setShowRecoveryInfo(isShow);
  }

  return (
    <div className={style.passwordRecoveryFormWrap}>
        <PasswordRecoveryForm showRecoveryInfo={showRecoveryInfo} handleChange={handleChange}/>
    </div>
  );
};

export default UserPasswordRecoveryContainer;
