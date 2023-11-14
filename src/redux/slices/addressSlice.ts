import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
    formValues: {
        country: string;
        state: string;
        city: string;
        zipCode: string;
        address: string;
    };
}

const initialState: AddressState = {
    formValues: {
        country: '',
        state: '',
        city: '',
        zipCode: '',
        address: '',
    },
};

const adressState = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveFormValues: (state, action: PayloadAction<AddressState[ 'formValues' ]>) => {
            state.formValues = { ...state.formValues, ...action.payload };
        },
    },
});

export const { saveFormValues } = adressState.actions;
export default adressState.reducer;
