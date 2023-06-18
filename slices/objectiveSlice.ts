import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ObjectiveState {
  index: string;
  ObjectiveDes: string;
}

const initialState: ObjectiveState[] = [];

const objectiveSlice = createSlice({
  name: "objectives",
  initialState,
  reducers: {
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
  },
});

export const { addObjective, deleteObjective, editObjective } =
  objectiveSlice.actions;
export default objectiveSlice.reducer;
