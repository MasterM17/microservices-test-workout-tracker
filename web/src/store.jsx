import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { authReducer } from "./components/auth/duck/index";
import { workoutsReducer } from "./components/dashboard/duck";

const reducer = {
  authReducer: authReducer,
  workoutsReducer: workoutsReducer,
};

const logger = createLogger();

export default configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
