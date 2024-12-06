import React from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Pomodoro } from './components/Pomodoro/Pomodoro';
import { TaskTracker } from './components/TaskTracker/TaskTracker';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Pomodoro />
        <TaskTracker />
      </main>
      <Footer />
    </div>
  );
};
