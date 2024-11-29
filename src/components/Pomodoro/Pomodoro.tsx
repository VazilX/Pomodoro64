import React from 'react';
import './Pomodoro.scss';
import { StageSelector } from '../StageSelector/StageSelector';
import { Timer } from '../Timer/Timer';
import { Quotation } from '../Quotation/Quotation';
import { ControlButton } from '../ControlButton/ControlButton';
import { Wave } from '../Wave/Wave';

export const Pomodoro: React.FC = () => {
  return (
    <section className="pomodoro">
      <div className="pomodoro__container">
        <StageSelector />
        <Timer />
        <ControlButton />
        <Quotation />
      </div>
      <Wave />
    </section>
  );
};
