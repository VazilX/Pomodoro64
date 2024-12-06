import { combineReducers, configureStore } from '@reduxjs/toolkit';
import timer from './reducers/timer';
import task from './reducers/task';

const rootReducer = combineReducers({
  timer,
  task,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];
