import React from 'react';
import imgPath from './../../img/logo.svg';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <a href="#" className="logo">
        <div className="img">
          <img src={imgPath} alt="logo" />
        </div>
        <span className="text">Pomodoro64</span>
      </a>
    </header>
  );
};
