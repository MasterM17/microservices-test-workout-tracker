import {
  fetchWorkoutsFail,
  fetchWorkoutsRequest,
  fetchWorkoutsSuccess,
} from "./actions";

import { getWorkouts } from "../../../api/workoutsApi";
import axios from "axios";

export const fetchWorkouts = (requestParams) => {
  return async (dispatch) => {
    dispatch(fetchWorkoutsRequest(requestParams));
    try {
      const response = await getWorkouts(requestParams);

      dispatch(fetchWorkoutsSuccess(response));
    //   console.log("Get workouts response", response);
      return response;
    } catch (err) {
      console.error("Fetch Workouts Error:", error);
      dispatch(fetchWorkoutsFail)(err);
    }
  };
};
