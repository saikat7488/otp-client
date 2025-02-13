import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  startTimer,
  stopTimer,
  decrementTime,
} from "../../feactures/counterSlice/counterSlice";

const CountdownTimer = ({ onTimeout }) => {
  const dispatch = useDispatch();
  const { timeLeft, isRunning } = useSelector((state) => state.counter);

  useEffect(() => {
    if (!isRunning && timeLeft > 0) {
      dispatch(startTimer());
    }
  }, [isRunning, timeLeft, dispatch]); // Automatically start the timer on mount

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    } else if (timeLeft === 0) {
      // Optional: Handle what happens when the timer reaches 0 (e.g., stop the timer)
      dispatch(stopTimer());
      onTimeout();
    }
    return () => clearInterval(timer); // Cleanup on component unmount
  }, [isRunning, timeLeft, dispatch, onTimeout]);

  // Format timeLeft in minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Pad minutes and seconds with leading zeros if needed
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div>
      <div>Time Left: {formattedTime}</div>
    </div>
  );
};

// Define prop types for CountdownTimer
CountdownTimer.propTypes = {
  onTimeout: PropTypes.func.isRequired,
};

export default CountdownTimer;
