import React, { useEffect, useRef, useState } from 'react';
import './Wave.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/redux';
import { BEFORE_REST } from '../../utils/variables';
import { Stage } from '../../types/Stage';

export const Wave: React.FC = () => {
  const [stageTo, setStageTo] = useState<Stage>('break');

  const refWave = useRef<HTMLDivElement>(null);
  const refCrest = useRef<HTMLDivElement>(null);
  const refLiquid = useRef<HTMLDivElement>(null);

  const { stage, isWorking, seconds, strick } = useAppSelector(
    state => state.timer,
  );

  const resetAnimations = () => {
    if (refWave.current) {
      const style = refWave.current.style;

      style.setProperty('--animation-hight-in', 'none');
      style.setProperty('--animation-hight-out', 'none');

      window.setTimeout(() => {
        if (refWave.current) {
          style.setProperty('--animation-hight-in', '');
          style.setProperty('--animation-hight-out', '');
        }
      }, 0);
    }
  };

  useEffect(() => {
    if (refWave.current) {
      switch (stage) {
        case 'focus':
          const newStageTo =
            (strick - 1) % BEFORE_REST === 0 && strick !== 0 ? 'rest' : 'break';

          setStageTo(newStageTo);
          break;

        case 'break':
          setStageTo('focus');

          break;

        default:
          setStageTo('focus');

          break;
      }

      const style = refWave.current.style;

      style.setProperty('--animation-duration', `${seconds}s`);

      resetAnimations();
    }
  }, [refWave, stage]);

  return (
    <div
      className={classNames('wave', {
        'wave--pouring': isWorking,
        'wave--focus-break': stage === 'focus' && stageTo === 'break',
        'wave--focus-rest': stage === 'focus' && stageTo === 'rest',
        'wave--break-focus': stage === 'break' && stageTo === 'focus',
        'wave--rest-focus': stage === 'rest' && stageTo === 'focus',
      })}
      ref={refWave}
    >
      <div className="wave__wrapper">
        <div className="wave__glass">
          <div
            className={classNames('wave__glass-in', {
              'wave__glass-in--pour-in': stage === 'focus',
              'wave__glass-in--pour-out': stage !== 'focus',
            })}
          >
            <div className="wave__crest" ref={refCrest}></div>
            <div className="wave__crest" ref={refCrest}></div>
            <div className="wave__crest" ref={refCrest}></div>
            <div className="wave__crest" ref={refCrest}></div>

            <div className="wave__air"></div>
            <div className="wave__liquid" ref={refLiquid}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
