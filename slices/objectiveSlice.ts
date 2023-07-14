import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ObjectiveState {
  index: string;
  ObjectiveDes: string;
  display_in_Resume?: boolean;
}

const initialState: ObjectiveState[] = [];

const objectiveSlice = createSlice({
  name: "objectives",
  initialState,
  reducers: {
    cleanUp_Objective_redux:() => initialState,
    initialize_ObjectiveData: (state, action: PayloadAction<string>) => {
      const { index, ObjectiveDes }: any = action.payload;
      //set the data format
      let Data = {
        index: index,
        ObjectiveDes: ObjectiveDes,
        display_in_Resume: false,
      };
      //push the tidied up data into state
      state.push(Data);
    },
    addObjective: (state, action) => {
      state.push(action.payload);
    },
    deleteObjective: (state, action) => {
      const { index } = action.payload;
      state.splice(
        state.findIndex((arrow) => arrow.index === index),
        1
      );
    },
    editObjective: (state, action) => {
      const { index, ObjectiveDes } = action.payload;
      const Objective = state.find((each) => each.index === index);
      if (Objective) {
        Objective.ObjectiveDes = ObjectiveDes;
      }
    },
    switch_display_in_Resume: (state, action) => {
      const { index, display_in_Resume } = action.payload;
      const Objective = state.find((each) => each.index === index);
      if (Objective) {
        Objective.display_in_Resume = display_in_Resume;
      }
    },
  },
});

export const {
  cleanUp_Objective_redux,
  initialize_ObjectiveData,
  addObjective,
  deleteObjective,
  editObjective,
  switch_display_in_Resume,
} = objectiveSlice.actions;
export default objectiveSlice.reducer;
