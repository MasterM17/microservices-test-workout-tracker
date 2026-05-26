import { logInFail, logOutUser, logInSuccess } from "./actions";
import { LogInUser } from "./../../../api/authApi";

export const logIntoApp = (requestParams) => {
  return async (dispatch) => {
    try {
      const response = await LogInUser(requestParams);
      dispatch(logInSuccess(response));
      console.log("operations response", response);

      return response;
    } catch (err) {
      console.log("Operations Login Error", err);
      dispatch(logInFail("Invalid Credentials"));
      return err;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    //  Wipe the persistent token from browser storage
    localStorage.removeItem("token");

    // Clear the token and user data out of the Redux state
    dispatch(logOutUser());
  };
};
