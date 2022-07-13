import { USER_SIGN_IN_REQUEST, USER_LOGOUT } from "../helpers/constants";
import { load, save } from "../helpers/localStorage";

const savedUser = load("currentUser");

let initialState = {
  firstName: "",
  lastName: "",
  avatar: "",
  userPosition: ""
};

if (savedUser) initialState = savedUser;

const comforters = (state = initialState, action) => {
  const { type, payload, token } = action;
  switch (type) {
    case USER_SIGN_IN_REQUEST:
      save("currentUser", { ...payload });
      save("token", token);
      return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatar: payload.avatar,
        ...payload
      };
    case USER_LOGOUT:
      window.location.replace("/");
      save("currentUser", "");
      save("token", "");
      return {
        firstName: "",
        lastName: "",
        login: ""
      };
    default:
      return state;
  }
};

export default comforters;
