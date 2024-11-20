import React from 'react';
import imgPath from './../../img/logo.svg';
import s from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <a href="#" className={s.logo}>
        <div className={s.img}>
          <img src={imgPath} alt="logo" />
        </div>
        <span className={s.text}>Pomodoro64</span>
      </a>
    </header>
  );
};
