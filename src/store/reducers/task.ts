/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterParam } from '../../types/FilterParam';
import { Task } from '../../types/Task';

export interface TaskStor {
  filterParam: FilterParam;
  taskList: Task[];
}

const initialState: TaskStor = {
  filterParam: 'all',
  taskList: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    switchTaskFilter(state: TaskStor, action: PayloadAction<FilterParam>) {
      state.filterParam = action.payload;
    },

    setTaskList(state: TaskStor, action: PayloadAction<Task[] | Task>) {
      if (Array.isArray(action.payload)) {
        state.taskList = action.payload;
      } else {
        state.taskList = [...state.taskList, action.payload];
      }
    },
  },
});

export default taskSlice.reducer;
