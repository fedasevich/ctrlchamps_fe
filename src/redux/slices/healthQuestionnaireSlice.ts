import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HealthQuestionnaireState {
  selectedDiagnoses: string[];
  selectedActivities: Record<string, string>;
  selectedEnvChallenges: string[];
}

const initialState: HealthQuestionnaireState = {
  selectedDiagnoses: [],
  selectedActivities: {},
  selectedEnvChallenges: [],
};

interface SelectDiagnosisPayload {
  diagnoses: string[];
}

interface SelectActivityPayload {
  activityName: string;
  status: string;
}

interface SelectEnvChallengesPayload {
  challenges: string[];
}

const healthQuestionnaireSlice = createSlice({
  name: 'healthQuestionnaire',
  initialState,
  reducers: {
    selectDiagnosis(state, action: PayloadAction<SelectDiagnosisPayload>) {
      state.selectedDiagnoses = action.payload.diagnoses;
    },
    selectActivity(state, action: PayloadAction<SelectActivityPayload>) {
      const { activityName, status } = action.payload;
      state.selectedActivities = {
        ...state.selectedActivities,
        [activityName]: status,
      };
    },
    selectEnvChallenges(state, action: PayloadAction<SelectEnvChallengesPayload>) {
      state.selectedEnvChallenges = action.payload.challenges;
    },
  },
});

export const { selectDiagnosis, selectActivity, selectEnvChallenges } =
  healthQuestionnaireSlice.actions;

export default healthQuestionnaireSlice.reducer;
export const healthQuestionnaireReducer = healthQuestionnaireSlice.reducer;
