import { USER_SIGN_IN_REQUEST, USER_LOGOUT } from "../../helpers/constants";
import { userInfo } from "../../helpers/testData";

export const userLogin = isLoggedIn => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_SIGN_IN_REQUEST,
        isLoggedIn,
        token: userInfo.token,
        payload: { ...userInfo}
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const userLogout = () => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_LOGOUT
      });
    } catch (error) {
      console.log(error);
    }
  };
};
