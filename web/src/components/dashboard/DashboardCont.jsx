import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardComponent } from "./DashboardComp";
import { fetchWorkouts } from "./duck/operations";

export default function DashboardContainer() {
  const dispatch = useDispatch();


  const workouts = useSelector((state) => state.workoutsReducer.workouts);
  const error = useSelector((state) => state.workoutsReducer.error);
  console.log("SELECTOR DATA:", workouts)

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, []);

  

  return (
    <div id="dashboard-container">
      <DashboardComponent
        workouts={workouts}
        error={error}
      ></DashboardComponent>
    </div>
  );
}
