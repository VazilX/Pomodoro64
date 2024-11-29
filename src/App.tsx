import React from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Pomodoro } from './components/Pomodoro/Pomodoro';
// import { useAppDispatch, useAppSelector } from './hooks/redux';
// import { userSlice } from './store/reducers/example';

export const App: React.FC = () => {
  // const { count } = useAppSelector(state => state.userReducer);  состояние
  // const { increment } = userSlice.actions; Экшн
  // const dispatch = useAppDispatch();

  // dispatch(increment(8));

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
