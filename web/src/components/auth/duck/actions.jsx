import { LOGIN_FAIL, LOGOUT_USER, LOGIN_SUCCESS } from "./constants";

export const logInSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const logInFail = (err) => {
  return {
    type: LOGIN_FAIL,
    payload: err,
  };
};

export const logOutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: "Logged Out",
  };
};
