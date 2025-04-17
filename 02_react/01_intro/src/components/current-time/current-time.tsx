import { Fragment } from "react";

export const CurrentTime = () => {
  // Getting the current Date-Time
  const now: Date = new Date();

  // Format the now-variable to the current Date
  const formattedDate: string = now.toLocaleDateString();
  // Format the now-variable to the curent time
  const formattedTime: string = now.toLocaleTimeString();

  // Get the current hour (0-23)
  const currentHour: number = now.getHours();

  // greet the user based on the date
  const greeting: string = currentHour < 12 ? "Good morning" : "Good afternon";

  return (
    <Fragment>
      <h3>Current Date and Time</h3>
      <p>Date: {formattedDate}</p>
      <p>Time: {formattedTime}</p>
      <p>{greeting}</p>
    </Fragment>
  );
};
