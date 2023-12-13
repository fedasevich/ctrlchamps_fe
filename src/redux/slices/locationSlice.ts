import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LocationState {
  location: string;
  timezone: string;
}

const initialState: LocationState = {
  location: '',
  timezone: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
  },
});

export const { setLocation, setTimezone } = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
