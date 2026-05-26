import { api } from "../config/properties";
import axios from "axios";

export const getWorkouts = async (params) => {
  try {
    const respons = await axios.get(`${api.localRoute}/api/v1/workouts`, {
      withCredentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    console.log("getWorkouts res", respons);
    return respons.data.data.workouts;
  } catch (error) {
    console.log("Api error", error);
    console.log("Status Code:", error.response?.status);
    console.log("Backend Error Message:", error.response?.data); 
    console.log("Full Api error log:", error);
  }
};
