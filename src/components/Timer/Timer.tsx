import React, { useEffect } from 'react';
import './Timer.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { timerSlice } from '../../store/reducers/timer';

export const Timer: React.FC = () => {
  const { seconds, intervalId, isWorking, stage } = useAppSelector(
    state => state.timer,
  );
  const { decrement, setIntervalId, timerSwitch } = timerSlice.actions;
  const dispatch = useAppDispatch();

  const abort = () => {
    window.clearInterval(intervalId);
    dispatch(setIntervalId());
  };

  useEffect(() => {
    if (isWorking) {
      const newIntervalId = window.setInterval(() => {
        dispatch(decrement());
      }, 1000);

      dispatch(setIntervalId(newIntervalId));
    } else {
      abort();
    }

    return () => {
      abort();
    };
  }, [isWorking]);

  if (seconds === 0) {
    abort();
    switch (stage) {
      case 'rest':
        dispatch(timerSwitch('focus'));
        break;

      case 'break':
        dispatch(timerSwitch('rest'));
        break;

      default:
        dispatch(timerSwitch('break'));
        break;
    }
  }

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  return (
    <article className="timer">
      <h1 className="timer__face">{`${minutes}:${secs}`}</h1>
    </article>
  );
};
