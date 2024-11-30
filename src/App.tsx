import React from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Pomodoro } from './components/Pomodoro/Pomodoro';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Pomodoro />
      </main>
      <Footer />
    </div>
  );
};
