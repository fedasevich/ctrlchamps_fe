import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    selectedOption: string;
}

const initialState: AuthState = {
    selectedOption: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSelectedOptionReducer: (state, action: PayloadAction<string>) => {
            state.selectedOption = action.payload;
        },
    },
});

export const { setSelectedOptionReducer } = authSlice.actions;

export default authSlice.reducer;
