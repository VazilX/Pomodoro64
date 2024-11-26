import { combineReducers, configureStore } from '@reduxjs/toolkit';
import timer from './reducers/timer';

const rootReducer = combineReducers({
  timer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];
