import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDiagnoses: [],
  selectedActivities: {},
  selectedEnvChallenges: [],
};

const healthQuestionnaireSlice = createSlice({
  name: 'healthQuestionnaire',
  initialState,
  reducers: {
    selectDiagnosis(state, action) {
      state.selectedDiagnoses = action.payload;
    },
    selectActivity(state, action) {
      const { activityName, status } = action.payload;
      state.selectedActivities = {
        ...state.selectedActivities,
        [activityName]: status,
      };
    },
    selectEnvChallenges(state, action) {
      state.selectedEnvChallenges = action.payload;
    },
  },
});

export const { selectDiagnosis, selectActivity, selectEnvChallenges } =
  healthQuestionnaireSlice.actions;

export default healthQuestionnaireSlice.reducer;
export const healthQuestionnaireReducer = healthQuestionnaireSlice.reducer;
