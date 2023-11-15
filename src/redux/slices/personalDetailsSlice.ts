import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPersonalDetails {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    isOpen?: boolean;
  };
}

const initialState: IPersonalDetails = {
  personalDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    isOpen: false,
  },
};

const personalDetailsSlice = createSlice({
  name: 'personalDetails',
  initialState,
  reducers: {
    savePersonalDetails: (state, action: PayloadAction<IPersonalDetails['personalDetails']>) => {
      state.personalDetails = { ...state.personalDetails, ...action.payload };
    },
  },
});

export const { savePersonalDetails } = personalDetailsSlice.actions;
export const personalDetailsReducer = personalDetailsSlice.reducer;
