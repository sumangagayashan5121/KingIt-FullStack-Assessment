import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from './actions';

export type User = {
  id: number | null;
  rank: number | null;
  points: number | null;
  newRank?: number | null;
};

const initialState: User = {
  id: null,
  rank: null,
  points: null,
  newRank: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { id, rank, points } = action.payload;
      state.id = id;
      state.rank = rank;
      state.points = points;
    },
    
  },
  extraReducers: (builder) => {
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.newRank = action.payload.rank;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
