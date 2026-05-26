import axios from "axios";
import { logInFail, logOutUser, logInSuccess } from "./actions";
import { LogInUser } from "./../../../api/authApi";
import { api } from "../../../config/properties";

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
  return async (dispatch) => {
    try {
      // Tell backend to clear the HttpOnly cookie
      await axios.post(
        `${api.localRoute}/api/v1/logout`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.log("Logout proxy request failed:", err.message);
    } finally {
      // clear frontend trace,
      localStorage.removeItem("token");
      dispatch(logOutUser());
    }
  };
};
