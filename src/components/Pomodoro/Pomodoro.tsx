import React from 'react';
import './Pomodoro.scss';
import { StageSelector } from '../StageSelector/StageSelector';
import { Timer } from '../Timer/Timer';
import { Quotation } from '../Quotation/Quotation';
import { ControlButton } from '../ControlButton/ControlButton';

export const Pomodoro: React.FC = () => {
  return (
    <section className="pomodoro">
      <StageSelector />
      <Timer />
      <ControlButton />
      <Quotation />
    </section>
  );
};
