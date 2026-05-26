import {
  GET_WORKOUTS_FAIL,
  GET_WORKOUTS_REQUEST,
  GET_WORKOUTS_SUCCESS,
} from "./constants";

export const fetchWorkoutsRequest = (requestParams) => {
  return {
    type: GET_WORKOUTS_REQUEST,
    payload: requestParams,
  };
};

export const fetchWorkoutsSuccess = (workouts) => {
  return {
    type: GET_WORKOUTS_SUCCESS,
    payload: workouts,
  };
};

export const fetchWorkoutsFail = (error) => {
  return {
    type: GET_WORKOUTS_FAIL,
    payload: error,
  };
};


