import React from 'react';
import './StageSelector.scss';
import { StageSelectorBtn } from '../StageSelectorBtn/StageSelectorBtn';
import { Stage } from '../../types/Stage';
import { timerSlice } from '../../store/reducers/timer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export const StageSelector: React.FC = () => {
  const { stage } = useAppSelector(state => state.timer);
  const { timerSwitch, refreshStrick } = timerSlice.actions;
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStage = e.target.value as Stage;

    if (newStage !== stage) {
      dispatch(timerSwitch(newStage));
      dispatch(refreshStrick());
    }
  };

  return (
    <fieldset className="stage-selector">
      <StageSelectorBtn
        time={25}
        value="focus"
        onChange={onChange}
        stage={stage}
      />
      <StageSelectorBtn
        time={5}
        value="break"
        onChange={onChange}
        stage={stage}
      />
      <StageSelectorBtn
        time={15}
        value="rest"
        onChange={onChange}
        stage={stage}
      />
    </fieldset>
  );
};
