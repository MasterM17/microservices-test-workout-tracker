import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_USER } from "./constants";
import {
  setUserStorage,
  removeUserStorage,
} from "./../../../config/StorageFunctions";

const iniState = {
  token: null,
  user: null,
};

export default function reducer(state = iniState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      setUserStorage(action.payload.token, action.payload.data.user.email);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.data.email,
      };

    case LOGIN_FAIL:
      return {
        ...state,
      };

    case LOGOUT_USER:
      removeUserStorage();
      return {
        ...state,
        token: null,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
}
