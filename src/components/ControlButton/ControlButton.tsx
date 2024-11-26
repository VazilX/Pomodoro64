import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { timerSlice } from '../../store/reducers/timer';
import './ControlButton.scss';

export const ControlButton: React.FC = () => {
  const { isWorking } = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();
  const { start, pause } = timerSlice.actions;

  const onStart = () => {
    dispatch(start());
  };

  const onPause = () => {
    dispatch(pause());
  };

  return (
    <>
      {!isWorking ? (
        <button className="button control-button" onClick={onStart}>
          START
        </button>
      ) : (
        <button className="button control-button" onClick={onPause}>
          PAUSE
        </button>
      )}
    </>
  );
};
