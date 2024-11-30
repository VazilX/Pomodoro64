import React, { useEffect } from 'react';
import './Timer.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { timerSlice } from '../../store/reducers/timer';
import { BEFORE_REST } from '../../utils/variables';

export const Timer: React.FC = () => {
  const { seconds, intervalId, isWorking, stage, strick } = useAppSelector(
    state => state.timer,
  );
  const { decrement, setIntervalId, timerSwitch, increaseStrick } =
    timerSlice.actions;
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

  useEffect(() => {
    if (seconds <= 0) {
      abort();

      const audio = new Audio('./sounds/sound_notific.mp3');

      audio.play();

      switch (stage) {
        case 'rest':
          dispatch(timerSwitch('focus'));
          break;

        case 'break':
          dispatch(timerSwitch('focus'));
          break;

        default:
          if ((strick + 1) % BEFORE_REST !== 0) {
            dispatch(timerSwitch('break'));
          } else {
            dispatch(timerSwitch('rest'));
          }

          dispatch(increaseStrick());

          break;
      }
    }
  }, [seconds]);

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
