import React from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="container"></div>
      <Footer />
    </div>
  );
};
