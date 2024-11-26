import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  name: string;
};

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
  count: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment(state: UserState, action: PayloadAction<number>) {
      // eslint-disable-next-line
      state.count += action.payload;
    },
  },
});

export default userSlice.reducer;
