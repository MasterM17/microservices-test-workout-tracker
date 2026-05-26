import axios from "axios";
import { api } from "../config/properties";

export const LogInUser = async (requestParams) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json,text/plain,*/*",
    },
  };

  const data = {
    email: requestParams.email,
    password: requestParams.password,
  };

  try {
    const response = await axios.post(
      `${api.localRoute}/api/v1/login`,
      data,
      config,
    );
    return response.data;
  } catch (err) {
    throw err;
    console.log("AuthApi error message", err.message);
  }
};
