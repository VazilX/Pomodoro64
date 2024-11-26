import React from 'react';
import './StageSelectorBtn.scss';
import { Stage } from '../../types/Stage';

type Props = {
  value: Stage;
  time: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stage: Stage;
};

export const StageSelectorBtn: React.FC<Props> = ({
  value,
  time,
  onChange,
  stage,
}) => {
  return (
    <label
      htmlFor={`stage-selector-btn-${value}`}
      className={`button stage-selector-btn stage-selector-btn--${value}`}
    >
      <b className="stage-selector-btn__title">{value}</b>
      <div
        className={`stage-selector-btn__icon stage-selector-btn__icon--${value}`}
      />
      <span className="stage-selector-btn__time">{time} minutes</span>
      <input
        type="radio"
        name="stage-selector-btn"
        id={`stage-selector-btn-${value}`}
        className="stage-selector-btn__input"
        value={value}
        checked={value === stage}
        onChange={onChange}
      />
    </label>
  );
};
