/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stage } from '../../types/Stage';

export interface Timer {
  seconds: number;
  focusTime: number;
  restTime: number;
  breakTime: number;
  intervalId: undefined | number;
  isWorking: boolean;
  stage: Stage;
  strick: number;
}

const initialState: Timer = {
  seconds: 1500,
  focusTime: 1500,
  breakTime: 300,
  restTime: 900,

  intervalId: undefined,
  isWorking: false,
  stage: 'focus',
  strick: 0,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrement(state: Timer) {
      state.seconds--;
    },
    timerSwitch(state: Timer, action: PayloadAction<Stage>) {
      state.isWorking = false;

      switch (action.payload) {
        case 'break':
          state.seconds = state.breakTime;
          state.stage = 'break';
          break;

        case 'rest':
          state.seconds = state.restTime;
          state.stage = 'rest';
          break;

        default:
          state.seconds = state.focusTime;
          state.stage = 'focus';
          break;
      }
    },
    start(state: Timer) {
      state.isWorking = true;
    },
    pause(state: Timer) {
      state.isWorking = false;
    },
    setIntervalId(state: Timer, action: PayloadAction<number | undefined>) {
      state.intervalId = action.payload;
    },
    increaseStrick(state: Timer) {
      state.strick++;
    },
    refreshStrick(state: Timer) {
      state.strick = 0;
    },
  },
});

export default timerSlice.reducer;
