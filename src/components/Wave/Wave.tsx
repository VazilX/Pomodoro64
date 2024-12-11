import React, { useEffect, useRef, useState } from 'react';
import './Wave.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import { BEFORE_REST, WAVE_COLOR } from '../../utils/variables';
import { Stage } from '../../types/Stage';

export const Wave: React.FC = () => {
  const [speed, setSpeed] = useState(0);

  const refGlassIn = useRef<HTMLDivElement>(null);
  const refLiquid = useRef<HTMLDivElement>(null);

  const { stage, isWorking, seconds, strick } = useAppSelector(
    state => state.timer,
  );

  const pauseBG = () => {
    if (!refLiquid.current) {
      return;
    }

    const main = document.querySelector('.main') as HTMLDivElement;

    const currentColor = getComputedStyle(refLiquid.current).backgroundColor;

    main.style.setProperty('--bg-color', `${currentColor}`);
  };

  useEffect(() => {
    if (!refGlassIn.current) {
      return;
    }

    const currentHight = refGlassIn.current.style.height;

    refGlassIn.current.style.height =
      stage === 'focus'
        ? `calc(${currentHight} + ${speed}%)`
        : `calc(${currentHight} - ${speed}%)`;

    refGlassIn.current.style.transitionDuration = '1s';
  }, [seconds]);

  useEffect(() => {
    if (isWorking) {
      let nextColor: Stage;

      if (stage === 'focus') {
        nextColor =
          (strick - 1) % BEFORE_REST === 0 && strick !== 0 ? 'rest' : 'break';
      } else {
        nextColor = 'focus';
      }

      const main = document.querySelector('.main') as HTMLDivElement;

      main.style.setProperty('--bg-color', `${WAVE_COLOR[nextColor]}`);
      main.style.setProperty('--transition-duration', `${seconds}s`);
    } else {
      pauseBG();
    }
  }, [isWorking]);

  useEffect(() => {
    setSpeed(100 / seconds);

    if (!refGlassIn.current) {
      return;
    }

    refGlassIn.current.style.height =
      stage === 'focus' ? 'var(--height-crest)' : '100%';
    refGlassIn.current.style.transitionDuration = '';

    pauseBG();

    const main = document.querySelector('.main') as HTMLDivElement;

    main.style.setProperty('--bg-color', `${WAVE_COLOR[stage]}`);
    main.style.setProperty('--transition-duration', '');
  }, [refGlassIn, stage]);

  return (
    <div className="wave">
      <div className="wave__wrapper">
        <div className="wave__glass">
          <div
            className={classNames('wave__glass-in', {
              'wave__glass-in--pour-in': stage === 'focus',
              'wave__glass-in--pour-out': stage !== 'focus',
            })}
            ref={refGlassIn}
          >
            <div className="wave__crest"></div>
            <div className="wave__crest"></div>
            <div className="wave__crest"></div>
            <div className="wave__crest"></div>

            <div className="wave__air"></div>
            <div className="wave__liquid" ref={refLiquid}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
