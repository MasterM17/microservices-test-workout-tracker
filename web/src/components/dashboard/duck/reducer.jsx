import {
  GET_WORKOUTS_FAIL,
  GET_WORKOUTS_REQUEST,
  GET_WORKOUTS_SUCCESS,
} from "./constants";

const initialState = {
  workouts: [],
  error: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORKOUTS_REQUEST:
      return {
        ...state,
      };

    case GET_WORKOUTS_SUCCESS:
        // console.log("REDUCER PAYLOAD:", action.payload)
      return {
        ...state,
        workouts: action.payload,
      };

    case GET_WORKOUTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
