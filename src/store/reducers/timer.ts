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
  // seconds: 1500,
  // focusTime: 1500,
  // breakTime: 300,
  // restTime: 900,

  seconds: 2,
  focusTime: 2,
  breakTime: 2,
  restTime: 3,

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
      // eslint-disable-next-line
      state.seconds--;
    },
    timerSwitch(state: Timer, action: PayloadAction<Stage>) {
      // eslint-disable-next-line
      state.isWorking = false;

      switch (action.payload) {
        case 'break':
          // eslint-disable-next-line
          state.seconds = state.breakTime;
          // eslint-disable-next-line
          state.stage = 'break';
          break;

        case 'rest':
          // eslint-disable-next-line
          state.seconds = state.restTime;
          // eslint-disable-next-line
          state.stage = 'rest';
          break;

        default:
          // eslint-disable-next-line
          state.seconds = state.focusTime;
          // eslint-disable-next-line
          state.stage = 'focus';
          break;
      }
    },
    start(state: Timer) {
      // eslint-disable-next-line
      state.isWorking = true;
    },
    pause(state: Timer) {
      // eslint-disable-next-line
      state.isWorking = false;
    },
    setIntervalId(state: Timer, action: PayloadAction<number | undefined>) {
      // eslint-disable-next-line
      state.intervalId = action.payload;
    },
    increaseStrick(state: Timer) {
      // eslint-disable-next-line
      state.strick++;
    },
    refreshStrick(state: Timer) {
      // eslint-disable-next-line
      state.strick = 0;
    },
  },
});

export default timerSlice.reducer;
