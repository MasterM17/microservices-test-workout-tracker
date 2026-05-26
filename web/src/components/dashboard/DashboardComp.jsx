import React from "react";

export const DashboardComponent = ({ workouts, error }) => {
  return (
    <div id="dashboard-component">
      <h2>Hello from dashboard</h2>
      <div className="workouts-container">
    
        {workouts?.length > 0 ? (
          workouts.map((workout) => (
        
            <div key={workout._id || workout.id} className="workout-card">
              {workout.image && (
                <img src={workout.image} alt={workout.exerciseName} />
              )}
              <h2>Workout:  {workout.excerciseName}</h2>
              <p>Weight: {workout.weight}kg</p>
              <p>Reps: {workout.reps}</p>
              <p>Muscle Group: {workout.muscleGroup}</p>
            </div>
          ))
        ) : (
          <p>No workouts found. Time to hit the gym! {error}</p>
        )}
      </div>
    </div>
  );
};
