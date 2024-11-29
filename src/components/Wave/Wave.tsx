import React, { useEffect, useRef } from 'react';
import './Wave.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import {
  BREAK_WAVE_COLOR,
  FOCUS_WAVE_COLOR,
  REST_WAVE_COLOR,
} from '../../utils/variables';

export const Wave: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { stage, isWorking, seconds } = useAppSelector(state => state.timer);

  const resetAnimations = () => {
    if (ref.current) {
      const style = ref.current.style;

      style.setProperty('--animation-hight-in', 'none');
      style.setProperty('--animation-hight-out', 'none');
      style.setProperty('--animation-color', 'none');

      window.setTimeout(() => {
        if (ref.current) {
          style.setProperty('--animation-hight-in', '');
          style.setProperty('--animation-hight-out', '');
          style.setProperty('--animation-color', '');
        }
      }, 0);
    }
  };

  useEffect(() => {
    if (ref.current) {
      let colorFrom;
      let colorTo;

      switch (stage) {
        case 'focus':
          colorFrom = FOCUS_WAVE_COLOR;
          colorTo = BREAK_WAVE_COLOR;

          break;

        case 'break':
          colorFrom = BREAK_WAVE_COLOR;
          colorTo = FOCUS_WAVE_COLOR;

          break;

        default:
          colorFrom = REST_WAVE_COLOR;
          colorTo = FOCUS_WAVE_COLOR;

          break;
      }

      resetAnimations();

      ref.current.style.setProperty('--color-wave-from', colorFrom);
      ref.current.style.setProperty('--color-wave-to', colorTo);

      ref.current.style.setProperty('--animation-duration', `${seconds}s`);
    }
  }, [ref, stage]);

  return (
    <div
      className={classNames('wave', { 'wave--pouring': isWorking })}
      ref={ref}
    >
      <div className="wave__wrapper">
        <div className="wave__glass">
          <div
            className={classNames('wave__glass-in', {
              'wave__glass-in--pour-in': stage === 'focus',
              'wave__glass-in--pour-out': stage !== 'focus',
            })}
          >
            <div
              className={classNames('wave__crest', {
                'wave__crest--pour-in': true,
                'wave__crest--pour-out': false,
              })}
            ></div>
            <div
              className={classNames('wave__crest', {
                'wave__crest--pour-in': true,
                'wave__crest--pour-out': false,
              })}
            ></div>
            <div
              className={classNames('wave__crest', {
                'wave__crest--pour-in': true,
                'wave__crest--pour-out': false,
              })}
            ></div>
            <div
              className={classNames('wave__crest', {
                'wave__crest--pour-in': true,
                'wave__crest--pour-out': false,
              })}
            ></div>

            <div className="wave__air"></div>
            <div className="wave__liquid"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
