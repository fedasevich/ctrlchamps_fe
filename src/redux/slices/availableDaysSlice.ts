import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ActionType = {
  weekDay: string;
  time: {
    from: string;
    to: string;
  };
};

const initialTime = {
  time: {
    from: '',
    to: '',
  },
};

const initialState = {
  days: {
    Monday: initialTime,
    Tuesday: initialTime,
    Wednesday: initialTime,
    Thursday: initialTime,
    Friday: initialTime,
    Saturday: initialTime,
    Sunday: initialTime,
  },
};

const availableDaysSlice = createSlice({
  name: 'availableDays',
  initialState,
  reducers: {
    chooseAvailableTime: (state, action: PayloadAction<ActionType>) => {
      const { time, weekDay } = action.payload;
      state.days = {
        ...state.days,
        [weekDay]: {
          time: { from: time.from, to: time.to },
        },
      };
    },
  },
});

export const { chooseAvailableTime } = availableDaysSlice.actions;
export const availableDaysReducer = availableDaysSlice.reducer;
